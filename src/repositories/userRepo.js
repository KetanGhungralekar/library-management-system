let users = [];
let nextId = 1;

function getAll() {
  return users;
}

function getById(id) {
  return users.find((u) => String(u.id) === String(id)) || null;
}

function create(data) {
  const newUser = {
    id: nextId++,
    name: data.name,
    email: data.email || null
  };

  users.push(newUser);
  return newUser;
}

function reset() {
  users = [];
  nextId = 1;
}

module.exports = {
  getAll,
  getById,
  create,
  reset
};
