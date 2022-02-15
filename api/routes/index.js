const errorHandler = require('../../utils/errorHandler');
const express = require('express');
const router = express.Router();

router.get(`/`, errorHandler(async (req, res, next) => {
   res.send(`This is just a server...`)
}));

module.exports = router;