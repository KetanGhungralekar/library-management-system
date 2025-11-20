const bookRepo = require('../repositories/bookRepo');
const userRepo = require('../repositories/userRepo');
const borrowRepo = require('../repositories/borrowRepo');
const { NotFoundError, BusinessError } = require('../utils/errors');

// Maximum books a user can borrow at same time
const MAX_ACTIVE_BORROWS = 3;

function borrowBook(userId, bookId) {
  const user = userRepo.getById(userId);
  if (!user) throw new NotFoundError("User not found");

  const book = bookRepo.getById(bookId);
  if (!book) throw new NotFoundError("Book not found");

  if (book.availableCopies <= 0) {
    throw new BusinessError("No copies available to borrow");
  }

  const activeBorrows = borrowRepo
    .getAll()
    .filter(r => r.userId === userId && !r.returnedAt);

  if (activeBorrows.length >= MAX_ACTIVE_BORROWS) {
    throw new BusinessError("User reached maximum active borrow limit");
  }

  const record = borrowRepo.create({
    userId,
    bookId,
    borrowedAt: new Date().toISOString()
  });

  // decrease available copies
  bookRepo.update(bookId, {
    ...book,
    availableCopies: book.availableCopies - 1
  });

  return record;
}

function returnBook(borrowId) {
  const record = borrowRepo.getById(borrowId);
  if (!record) throw new NotFoundError("Borrow record not found");

  if (record.returnedAt) {
    throw new BusinessError("Book already returned");
  }

  const book = bookRepo.getById(record.bookId);
  if (!book) throw new NotFoundError("Book missing");

  const updated = borrowRepo.update(borrowId, {
    ...record,
    returnedAt: new Date().toISOString()
  });

  // increase available copies
  bookRepo.update(book.id, {
    ...book,
    availableCopies: book.availableCopies + 1
  });

  return updated;
}

function getAllBorrows() {
  return borrowRepo.getAll();
}

module.exports = {
  borrowBook,
  returnBook,
  getAllBorrows
};
