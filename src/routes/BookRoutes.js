const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/BookController');

// CRUD + search
router.get('/', bookController.getAllBooks);
router.get('/search', bookController.searchBooks);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
