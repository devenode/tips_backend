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
   res.send(`This is just a server...`)
}));

module.exports = router;