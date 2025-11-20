const userRepo = require('../repositories/userRepo');
const { validateUser } = require('../utils/validators');

function getAllUsers() {
  return userRepo.getAll();
}

function createUser(data) {
  validateUser(data);
  return userRepo.create(data);
}

module.exports = {
  getAllUsers,
  createUser
};
