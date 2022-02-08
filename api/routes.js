const express = require('express');
const router = express.Router();
const index = require('./routes/index');
const post = require('./routes/post');

router.use(`/`, index);
router.use(`/post`, post);

module.exports = router;