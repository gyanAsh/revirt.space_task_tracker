const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const authVerify = require('../middleware/authVerify');

const User = require('../models/User');

//@route    GET api/v1/auth
//@desc     GET user information
//@access   Private
router.get('/', authVerify, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//@route    POST api/v1/auth
//@desc     User login
//@access   Public
router.post('/', [
        body('email', "Enter valid email").isEmail(),
        body('password', "Password is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req, res);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({msg: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg: "Invalid Credentials"});
        }

        const payload = {
            user: {
                id:user.id,
            }
        }

        const jwtSecret = config.tokenSecret;
        jwt.sign(payload, jwtSecret, {
            expiresIn:"2 days"
        } ,(err, token) => {
            if (err) {
                throw err;
            }
            return res.status(200).json(token);
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

module.exports = router;