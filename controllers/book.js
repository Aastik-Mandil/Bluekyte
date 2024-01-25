const mongoose = require("mongoose");

const Book = require("../models/book");

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Books fetched successfully",
      data: books,
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error while fetching books",
      data: null,
      error: err.message,
    });
  }
};

const getBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById({ _id: id });
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Book fetched successfully",
      data: book,
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error while fetching book",
      data: null,
      error: err.message,
    });
  }
};

const createBook = async (req, res) => {
  const book = req.body;
  try {
    const newBook = new Book(book);
    await newBook.save();
    res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Book created successfully",
      data: newBook,
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error while creating book",
      data: null,
      error: err.message,
    });
  }
};

const updateBook = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const book = { ...req.body, _id };
    const updatedBook = await Book.findByIdAndUpdate(
      _id,
      book,
      { new: true }
    );
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Book updated successfully",
      data: updatedBook,
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error while updating book",
      data: null,
      error: err.message,
    });
  }
};

const deleteBook = async (req, res) => {
  const { id: _id } = req.params;
  try {
    await Book.findByIdAndDelete(_id);
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Book deleted successfully",
      data: null,
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error while deleting books",
      data: null,
      error: err.message,
    });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
