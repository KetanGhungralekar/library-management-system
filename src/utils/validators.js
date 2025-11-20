const { ValidationError } = require('./errors');

function validateBook(book) {
  if (!book.title || typeof book.title !== 'string') {
    throw new ValidationError('Book title is required');
  }
  if (!book.author || typeof book.author !== 'string') {
    throw new ValidationError('Book author is required');
  }
  if (!book.totalCopies || book.totalCopies <= 0) {
    throw new ValidationError('totalCopies must be > 0');
  }
}

function validateUser(user) {
  if (!user.name || typeof user.name !== 'string') {
    throw new ValidationError('User name is required');
  }
}


module.exports = { validateBook, validateUser };