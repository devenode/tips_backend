const logger = require('../../utils/logger')('Posts.js');
const express = require('express');
const router = express.Router();

const errorHandler = reqHandler => async (req, res, next) => {
   try {
      await reqHandler(req, res, next);
   } catch (err) {
      logger.info(err.stack);
      res.status(500).send(err.message);
   }
}

router.get(`/:id`, errorHandler(async (req, res, next) => {
   const { id } = req.params;
   const { Posts, Sections } = req.models;

   const dataPost = await Posts.findOne({
      where: { id },
      include: [Sections]
   });

   if (!dataPost) {
      res.status(404).end();
      return;   
   }

   const post = dataPost.get({ plain: true });
   res.json(post);
}));

router.post(`/`, errorHandler(async (req, res, next) => {
   const post = req.body;
   const { Posts } = req.models;

   await Posts.create({
      shortTitle: post.shortTitle,
      content: post.content,
      Section: {
         title: post.section.title
      }
   }, {
      include: [Posts.Sections]
   });

   res.status(200).end();
}));

module.exports = router;