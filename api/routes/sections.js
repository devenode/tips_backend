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
   const { posts, sections } = req.models;

   const sectionsData = await sections.findAll({
      include: [posts]
   });

   const sectionsRows = sectionsData.map(el => el.get({ plain: true }));
   res.json(sectionsRows);
}));

module.exports = router;