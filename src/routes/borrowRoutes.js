const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');

// Borrow a book
router.post('/', borrowController.borrowBook);

// Return a book
router.post('/return', borrowController.returnBook);

// List all borrow records
router.get('/', borrowController.getAllBorrows);

module.exports = router;
