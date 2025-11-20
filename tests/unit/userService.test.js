const { expect } = require('chai');
const userService = require('../../src/services/userService');
const userRepo = require('../../src/repositories/userRepo');

describe('UserService Unit Tests', () => {

  beforeEach(() => {
    userRepo.reset();
  });

  it('should create a new user', () => {
    const user = userService.createUser({
      name: "Alice",
      email: "alice@example.com"
    });

    expect(user.id).to.exist;
    expect(user.name).to.equal("Alice");
  });

  it('should get all users', () => {
    userService.createUser({ name: "Bob" });
    const users = userService.getAllUsers();
    expect(users.length).to.equal(1);
  });

  it('should throw error for invalid user', () => {
    expect(() =>
      userService.createUser({
        name: ""
      })
    ).to.throw();
  });

});
