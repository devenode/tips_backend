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
   const { posts } = req.models;

   const newPostData = await posts.create({
      shortTitle: post.shortTitle,
      content: post.content,
      section: {
         title: post.section.title
      }
   }, {
      include: [posts.sections]
   });

   const newPost = newPostData.get({ plain: true });
   res.json(newPost);
}));

module.exports = router;