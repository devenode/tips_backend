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

   const post = await Posts.findOne({
      where: { id },
      include: [Sections],
      raw: true
   });
   
   res.json(post);
}));

module.exports = router;