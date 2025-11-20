const userService = require('../services/userService');

function getAllUsers(req, res, next) {
  try {
    const users = userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

function createUser(req, res, next) {
  try {
    const created = userService.createUser(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllUsers,
  createUser
};
