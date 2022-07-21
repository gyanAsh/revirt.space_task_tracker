const express = require('express');
const router = express.Router();
const authVerify = require('../middleware/authVerify');
const { body, validationResult } = require('express-validator');
const Todo = require('../models/Todo');
const { Http2ServerResponse } = require('http2');

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

// @route   GET api/v1/todo
// @desc    POST new todo
// @access  Private
router.post('/', authVerify,
    body('title',"Task cannot be empty").not().isEmpty()
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title } = req.body;

        try {
            const newTodo = new Todo({ user: req.user.id, title });
            const todo = await newTodo.save();
            res.json(todo);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    
})



module.exports = router;