const errorHandler = require('../../utils/errorHandler');
const express = require('express');
const router = express.Router();

router.get(`/:id`, errorHandler(async (req, res, next) => {
   const { id } = req.params;
   const { posts, sections } = req.models;

   const dataPost = await posts.findOne({
      where: { id },
      include: [sections]
   });

   if (!dataPost) {
      res.status(404).send(`No such post...`);
      return;
   }

   const post = dataPost.get({ plain: true });
   res.json(post);
}));

router.post(`/`, errorHandler(async (req, res, next) => {
   const post = req.body;
   const { posts, sections } = req.models;
   const { db } = req.sql;

   if (post.section) {
      const section = await sections.findOne({
         where: { title: post.section.title },
         raw: true
      });
      if (section) {
         const newPostData = await posts.create({
            shortTitle: post.shortTitle,
            content: post.content,
            sectionId: section.id
         });

         const newPost = newPostData.get({ plain: true });
         res.json(newPost);
         return;
      }
   }

   const newPost = await db.transaction(async t => {
      const newPostData = await posts.create({
         shortTitle: post.shortTitle,
         content: post.content,
         section: {
            title: post.section.title
         }
      }, {
         include: [posts.sections],
         transaction: t
      });

      const newPost = newPostData.get({ plain: true });
      return newPost;
   });

   res.json(newPost);
}));

router.put(`/`, errorHandler(async (req, res, next) => {
   const { id, shortTitle, content } = req.body;
   const { posts } = req.models;

   await posts.update(
      { shortTitle, content },
      { where: { id } }
   );

   res.status(200).end();
}));

module.exports = router;