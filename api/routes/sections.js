const errorHandler = require('../../utils/errorHandler');
const express = require('express');
const router = express.Router();

router.get(`/`, errorHandler(async (req, res, next) => {
   const { posts, sections } = req.models;

   const sectionsData = await sections.findAll({
      include: [posts]
   });

   const sectionsRows = sectionsData.map(el => el.get({ plain: true }));
   res.json(sectionsRows);
}));

module.exports = router;