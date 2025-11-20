const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');

const bookRepo = require('../../src/repositories/bookRepo');
const userRepo = require('../../src/repositories/userRepo');
const borrowRepo = require('../../src/repositories/borrowRepo');

describe('Borrow Routes Integration Tests', () => {

  beforeEach(() => {
    bookRepo.reset();
    userRepo.reset();
    borrowRepo.reset();

    userRepo.create({ name: "Alice" });
    bookRepo.create({
      title: "Integration Book",
      author: "Author",
      totalCopies: 1,
      availableCopies: 1
    });
  });

  it('should borrow a book through API', async () => {
    const res = await request(app)
      .post('/api/borrow')
      .send({ userId: 1, bookId: 1 });

    expect(res.status).to.equal(201);
    expect(res.body.id).to.exist;

    const book = bookRepo.getById(1);
    expect(book.availableCopies).to.equal(0);
  });

  it('should return a borrowed book through API', async () => {
    const borrowRes = await request(app)
      .post('/api/borrow')
      .send({ userId: 1, bookId: 1 });

    const returnRes = await request(app)
      .post('/api/borrow/return')
      .send({ borrowId: borrowRes.body.id });

    expect(returnRes.status).to.equal(200);
    expect(returnRes.body.returnedAt).to.exist;

    const book = bookRepo.getById(1);
    expect(book.availableCopies).to.equal(1);
  });

  it('should fetch borrow history through API', async () => {
    await request(app)
      .post('/api/borrow')
      .send({ userId: 1, bookId: 1 });

    const res = await request(app).get('/api/borrow');

    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(1);
  });

});
