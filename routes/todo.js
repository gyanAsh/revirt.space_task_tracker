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

// @route   POST api/v1/todo
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

// @route   POST api/v1/todo
// @desc    Update status of existing todo
// @access  Private
router.patch('/:id', authVerify, async (req, res) => {

    const { completed } = req.body;

    try {
        let todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).send("Todo Not Found");
        }
        if (req.user.id !== todo.user.toString()) {
            return res.status(401).send("Unauthorized Request");
        }

        todo = await Todo.findByIdAndUpdate(req.params.id,
            {completed},
            { new: true });
        return res.json(todo);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// @route   DELETE api/v1/todo
// @desc    Delete existing todo
// @access  Private
router.delete('/:id', authVerify, async (req, res) => {

    try {
        
        let todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).send("Todo Not Found");
        }
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized User");
        }

        await Todo.findByIdAndDelete(req.params.id);
        return res.json({ msg: "Todo Deleted" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }
    
})
module.exports = router;