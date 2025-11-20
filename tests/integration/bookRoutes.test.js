const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');
const bookRepo = require('../../src/repositories/bookRepo');

describe('Book Routes Integration Tests', () => {

  beforeEach(() => {
    bookRepo.reset();
  });

  it('should create a book through API', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({
        title: "API Book",
        author: "Tester",
        totalCopies: 5
      });

    expect(res.status).to.equal(201);
    expect(res.body.id).to.exist;
    expect(res.body.title).to.equal("API Book");
  });

  it('should fetch all books through API', async () => {
    await request(app).post('/api/books').send({
      title: "Test Book",
      author: "Someone",
      totalCopies: 2
    });

    const res = await request(app).get('/api/books');

    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(1);
  });

  it('should search books through API', async () => {
    await request(app).post('/api/books').send({
      title: "JavaScript Basics",
      author: "John",
      totalCopies: 3
    });

    const res = await request(app)
      .get('/api/books/search?q=script');

    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(1);
  });

});
