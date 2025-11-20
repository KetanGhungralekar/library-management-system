const bookRepo = require('../repositories/bookRepo');
const { validateBook } = require('../utils/validators');
const { NotFoundError } = require('../utils/errors');

function getAllBooks() {
  return bookRepo.getAll();
}

function searchBooks(query) {
  const all = bookRepo.getAll();
  const lower = query.toLowerCase();

  return all.filter(
    (b) =>
      b.title.toLowerCase().includes(lower) ||
      b.author.toLowerCase().includes(lower)
  );
}

function createBook(data) {
  validateBook(data);
  return bookRepo.create(data);
}

function updateBook(id, updates) {
  const existing = bookRepo.getById(id);
  if (!existing) throw new NotFoundError('Book not found');

  const updated = { ...existing, ...updates };
  validateBook(updated);

  return bookRepo.update(id, updated);
}

function deleteBook(id) {
  const existing = bookRepo.getById(id);
  if (!existing) throw new NotFoundError('Book not found');

  bookRepo.delete(id);
}

module.exports = {
  getAllBooks,
  searchBooks,
  createBook,
  updateBook,
  deleteBook
};
