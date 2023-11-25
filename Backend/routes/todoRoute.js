const express = require('express');

const router = express.Router();

const {createTodo, getAllTodo, getTodo, updateTodo, deleteTodo} = require('../controllers/todoController')

router.post('/create', createTodo);
router.get('/getAll', getAllTodo);
router.get('/get/:id', getTodo);
router.put('/update/:id', updateTodo);
router.delete('/delete/:id', deleteTodo)

module.exports = router;