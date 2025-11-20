const borrowService = require('../services/borrowService');

function borrowBook(req, res, next) {
  try {
    const { userId, bookId } = req.body;
    const record = borrowService.borrowBook(userId, bookId);
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
}

function returnBook(req, res, next) {
  try {
    const { borrowId } = req.body;
    const updated = borrowService.returnBook(borrowId);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

function getAllBorrows(req, res, next) {
  try {
    const borrows = borrowService.getAllBorrows();
    res.json(borrows);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  borrowBook,
  returnBook,
  getAllBorrows
};
