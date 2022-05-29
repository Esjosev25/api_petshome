const express = require('express');
const router = express.Router();




// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => res.send('User route'));

router.post('/', (req, res) => {

    res.json({ file: req.file });
})
module.exports = router;