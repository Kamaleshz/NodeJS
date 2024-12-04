const bookService = require('../services/bookService');

// Fetch all books
async function getAllBooks(req, res, next) {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    next(error);  // Pass errors to the error handler
  }
}

// Fetch a single book by ID
async function getBookById(req, res, next) {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
}

// Create a new book
async function createBook(req, res, next) {
  try {
    const newBook = await bookService.createBook(req.body.title);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
}

// Update an existing book
async function updateBook(req, res, next) {
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body.title);
    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
}

// Delete a book
async function deleteBook(req, res, next) {
  try {
    await bookService.deleteBook(req.params.id);
    res.status(204).end();  // No content
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
