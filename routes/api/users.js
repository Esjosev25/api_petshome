const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');

const User = require('../../models/User');

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/:id', (req, res) => {


    res.send('User route');
}
);


// @route   POST api/users
// @desc    Get all users
// @access  Public

router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
    check('birthdate', 'Please enter a valid birthdate').isDate('MM/dd/yyyy').
        isBefore(new Date().toLocaleDateString('en-US')),

], async (req, res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { name, email, password, birthdate } = req.body;
    try {


        //see if user exists
        let user = await User.findOne({ email })

        if (user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'User already exists' }] });
        }

        user = new User({
            name,
            password,
            email,
            birthdate
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        console.log(user.birthdate);
        await user.save();

        const payload = {
            user: { id: user.id }
        }

        jwt.sign(payload,
            process.env.jwtSecret,
            { expiresIn: 36000000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});


module.exports = router;