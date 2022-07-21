const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {body,validationResult} = require('express-validator');
const User = require('../models/User');


// @route   GET api/v1/user
// @desc    Register a new user
// @access  Public
router.post('/',
    body('name', "Name is required").not().isEmpty(),
    body('email', 'Email is required').isEmail(),
    body('password',"Password of length atleast 5 is Required").isLength({min:8})
    , async(req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {

            let user = await User.findOne({ email });
            
            if (user) {
                return res.status(400).json(({ msg: "User already exists" }));
            }
            
            user = new User({ name, email, password });

            const salt = await bcrypt.genSalt(13);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id:user.id
                }
            }

            const jwtSecret = config.tokenSecret;

            jwt.sign(payload, jwtSecret, {
                expiresIn: "2 days"
            }, (err, token) => {
                if (err) {
                    throw err;
                }
                res.json({ token });
            })

            
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error!")
        }

})

module.exports = router;
