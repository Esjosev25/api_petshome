const express = require('express');
const router = express.Router();

// @route   GET api/orgs
// @desc    Get all orgs
// @access  Public
router.get('/', (req, res) => res.send('org route'));

module.exports = router;