const bookService = require('../services/BookService');

function getAllBooks(req, res, next) {
  try {
    const books = bookService.getAllBooks();
    res.json(books);
  } catch (err) {
    next(err);
  }
}

function searchBooks(req, res, next) {
  try {
    const q = req.query.q || '';
    const results = bookService.searchBooks(q);
    res.json(results);
  } catch (err) {
    next(err);
  }
}

function createBook(req, res, next) {
  try {
    const newBook = bookService.createBook(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
}

function updateBook(req, res, next) {
  try {
    const updated = bookService.updateBook(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

function deleteBook(req, res, next) {
  try {
    bookService.deleteBook(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllBooks,
  searchBooks,
  createBook,
  updateBook,
  deleteBook
};
