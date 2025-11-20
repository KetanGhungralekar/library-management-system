const { expect } = require('chai');
const bookService = require('../../src/services/bookService');
const bookRepo = require('../../src/repositories/bookRepo');

describe('BookService Unit Tests', () => {

  beforeEach(() => {
    bookRepo.reset();
  });

  it('should create a new book', () => {
    const book = bookService.createBook({
      title: "Clean Code",
      author: "Robert Martin",
      totalCopies: 3
    });

    expect(book.id).to.exist;
    expect(book.availableCopies).to.equal(3);
  });

  it('should return all books', () => {
    bookService.createBook({
      title: "Test Book",
      author: "Author",
      totalCopies: 1
    });

    const all = bookService.getAllBooks();
    expect(all.length).to.equal(1);
  });

  it('should search books by title or author', () => {
    bookService.createBook({
      title: "JavaScript Guide",
      author: "John Doe",
      totalCopies: 2
    });

    const search1 = bookService.searchBooks("javascript");
    expect(search1.length).to.equal(1);

    const search2 = bookService.searchBooks("john");
    expect(search2.length).to.equal(1);
  });

  it('should throw an error for invalid book data', () => {
    expect(() =>
      bookService.createBook({
        title: "",
        author: "Test",
        totalCopies: 0
      })
    ).to.throw();
  });

});
