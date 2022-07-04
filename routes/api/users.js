const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => res.send('User route'));


// @route   POST api/users
// @desc    Get all users
// @access  Public

router.post('/', [check('name', 'name is required').not().isEmpty(), check('email', 'Please include a valid email').isEmail(),
check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })], async (req, res) => {
    console.log(req.body);

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { name, email, password } = req.body;
    try {


        //see if user exists
        let user = await User.findOne({ email })

        if (user) {
            res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        user = new User({
            name, password, email
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();


        res.send('hola');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});


module.exports = router;