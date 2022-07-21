const express = require('express');
const router = express.Router();
const authVerify = require('../middleware/authVerify')
const Todo = require('../models/Todo');

// @route   GET api/v1/todo
// @desc    Get all of user todos
// @access  Private
router.get('/',authVerify ,async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id }).sort({ date: -1 });
        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})



module.exports = router;