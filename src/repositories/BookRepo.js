let books = [];
let nextId = 1;

function getAll() {
  return books;
}

function getById(id) {
  return books.find((b) => String(b.id) === String(id)) || null;
}

function create(data) {
  const newBook = {
    id: nextId++,
    title: data.title,
    author: data.author,
    totalCopies: data.totalCopies,
    availableCopies: data.availableCopies ?? data.totalCopies
  };

  books.push(newBook);
  return newBook;
}

function update(id, updated) {
  const index = books.findIndex((b) => String(b.id) === String(id));
  if (index === -1) return null;

  books[index] = { ...books[index], ...updated };
  return books[index];
}

function deleteBook(id) {
  books = books.filter((b) => String(b.id) !== String(id));
}

function reset() {
  books = [];
  nextId = 1;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteBook,
  reset
};
