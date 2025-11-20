const { expect } = require('chai');
const borrowService = require('../../src/services/borrowService');
const bookRepo = require('../../src/repositories/bookRepo');
const userRepo = require('../../src/repositories/userRepo');
const borrowRepo = require('../../src/repositories/borrowRepo');

describe('BorrowService Unit Tests', () => {

  beforeEach(() => {
    userRepo.reset();
    bookRepo.reset();
    borrowRepo.reset();

    userRepo.create({ name: "Alice" });
    bookRepo.create({
      title: "Clean Code",
      author: "Robert Martin",
      totalCopies: 2,
      availableCopies: 2
    });
  });

  it('should allow borrowing a book', () => {
    const result = borrowService.borrowBook(1, 1);
    expect(result.id).to.exist;

    const book = bookRepo.getById(1);
    expect(book.availableCopies).to.equal(1);
  });

  it('should not allow borrowing when no copies left', () => {
    borrowService.borrowBook(1, 1);
    borrowService.borrowBook(1, 1);

    expect(() => borrowService.borrowBook(1, 1)).to.throw();
  });

  it('should not allow borrowing more than limit', () => {
    bookRepo.create({ title: "Book2", author: "A", totalCopies: 1 });
    bookRepo.create({ title: "Book3", author: "A", totalCopies: 1 });
    bookRepo.create({ title: "Book4", author: "A", totalCopies: 1 });

    borrowService.borrowBook(1, 1);
    borrowService.borrowBook(1, 2);
    borrowService.borrowBook(1, 3);

    expect(() => borrowService.borrowBook(1, 4)).to.throw();
  });

  it('should return a borrowed book', () => {
    const borrow = borrowService.borrowBook(1, 1);
    const returned = borrowService.returnBook(borrow.id);

    expect(returned.returnedAt).to.exist;

    const book = bookRepo.getById(1);
    expect(book.availableCopies).to.equal(2);
  });

  it('should not allow returning a book twice', () => {
    const borrow = borrowService.borrowBook(1, 1);
    borrowService.returnBook(borrow.id);

    expect(() => borrowService.returnBook(borrow.id)).to.throw();
  });

});
