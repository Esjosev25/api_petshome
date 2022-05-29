const express = require('express');
const router = express.Router();

// @route   GET api/seguimiento
// @desc    Get all sew
// @access  Public
router.get('/', (req, res) => res.send('User route'));

module.exports = router;