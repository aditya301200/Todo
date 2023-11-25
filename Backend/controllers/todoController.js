const Todo = require("../models/todoSchema");

exports.createTodo = async (req, res) => {
  try {
    const { text } = req.body;

    const createTodo = await Todo.create({ text });

    res.status(201).json({
      success: true,
      data: createTodo,
      message: "Todo created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: "Internal Sever Error",
      message: err.message,
    });
  }
};

exports.getAllTodo = async (req, res) => {
  try {
    const getAllTodo = await Todo.find();

    res.status(200).json({
      success: true,
      data: getAllTodo,
      message: "All Todo fetching successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: "Internal Sever Error",
      message: err.message,
    });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const getTodo = await Todo.findById({ _id: id });

    res.status(200).json({
      success: true,
      data: getTodo,
      message: "Single Todo fetching successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: "Internal Sever Error",
      message: err.message,
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text,completed } = req.body;
    const updateTodo = await Todo.findByIdAndUpdate(
      { _id: id },
      { text, completed, updateAt: Date.now() },
      { new: true },
    ).exec();

    res.status(200).json({
      success: true,
      data: updateTodo,
      message: "Todo updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: "Internal Sever Error",
      message: err.message,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await Todo.findByIdAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      data: deleteTodo,
      message: "Single Todo fetching successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: "Internal Sever Error",
      message: err.message,
    });
  }
};
