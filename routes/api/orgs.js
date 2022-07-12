const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator')

const jwt = require('jsonwebtoken');
const Org = require('../../models/Org');
// @route   GET api/orgs
// @desc    Get all orgs
// @access  Public
router.get('/', (req, res) => res.send('org route'));

// @route   GET api/orgs
// @desc    Get all orgs
// @access  Public
router.post('/', [
    check('name', 'name organizations is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
], async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    const { name, email, password } = req.body;
    try {

        let org = await Org.findOne({ email })
        //see if organization exists
        if (org) {
            return res.status(400).json({ errors: [{ msg: 'Email already exists' }] });
        }
        org = new Org({
            name,
            email,
            password
        });
        const salt = await bcrypt.genSalt(10);

        org.password = await bcrypt.hash(password, salt);


        await org.save();

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
    } catch (errores) {
        console.error(errores.message);
        res.status(500).send('Server Error');
    }

});


module.exports = router;