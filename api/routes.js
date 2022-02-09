const express = require('express');
const router = express.Router();
const index = require('./routes/index');
const post = require('./routes/post');
const sections = require('./routes/sections');

router.use(`/`, index);
router.use(`/post`, post);
router.use(`/sections`, sections);

module.exports = router;