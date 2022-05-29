const express = require('express');
const router = express.Router();

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => res.send('profile route'));

module.exports = router;