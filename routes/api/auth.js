const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Org = require('../../models/Org');
// @route   GET api/auth
// @desc    Get all auth
// @access  Public
router.get('/users', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        console.error(error);
        res.send(500).send('Server Error');
    }
});



// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public

router.post('/users', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()

], async (req, res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { email, password } = req.body;
    try {


        //see if user exists
        let user = await User.findOne({ email })

        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

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

router.get('/orgs', auth, async (req, res) => {
    try {
        const org = await Org.findById(req.user.id).select('-password');
        res.json(org)
    } catch (error) {
        console.error(error);
        res.send(500).send('Server Error');
    }
})


router.post('/orgs', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()], async (req, res) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }

        const { email, password } = req.body;
        try {
            let org = await Org.findOne({ email })
            //see if organization exists
            if (!org) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, org.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const payload = {
                user: { id: org.id }
            }

            jwt.sign(payload,
                process.env.jwtSecret,
                { expiresIn: 36000000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                });
        } catch (errror) {
            console.error(error);
            res.send(500).send('Server Error');
        }
    })
module.exports = router;