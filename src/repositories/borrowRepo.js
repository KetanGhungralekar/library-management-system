let borrows = [];
let nextId = 1;

function getAll() {
  return borrows;
}

function getById(id) {
  return borrows.find(r => String(r.id) === String(id)) || null;
}

function create(data) {
  const newRecord = {
    id: nextId++,
    userId: data.userId,
    bookId: data.bookId,
    borrowedAt: data.borrowedAt,
    returnedAt: null
  };

  borrows.push(newRecord);
  return newRecord;
}

function update(id, updated) {
  const index = borrows.findIndex(r => String(r.id) === String(id));
  if (index === -1) return null;

  borrows[index] = { ...borrows[index], ...updated };
  return borrows[index];
}

function reset() {
  borrows = [];
  nextId = 1;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  reset
};
