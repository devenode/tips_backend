const logger = require('../../utils/logger')('Sections.js');
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

router.get(`/`, errorHandler(async (req, res, next) => {
   const { Posts, Sections } = req.models;

   const data = await Sections.findAll({
      include: [Posts]
   });

   const sections = data.map(el => el.get({ plain: true }));
   res.json(sections);
}));

module.exports = router;