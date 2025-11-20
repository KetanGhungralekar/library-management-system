# Library Management System – Software Testing Project

A simple **Node.js + Express** backend demonstrating software testing concepts:
unit testing, integration testing, and mutation testing.

---

## Features

### Books

* Add, update, delete books
* Search books
* Track available copies

### Users

* Create and list users

### Borrow / Return

* Borrow a book (max 3 active borrows)
* Prevent borrowing when no copies are available
* Return a borrowed book
* View borrow history

---

## Project Structure

```
src/
  routes/
  controllers/
  services/
  repositories/
  middlewares/
  utils/
tests/
  unit/
  integration/
reports/
  mutation/
```

---

## Installation and Running

Install dependencies:

```
npm install
```

Start the server:

```
npm start
```

Server runs at:

```
http://localhost:3000
```

---

## Testing

Run all unit and integration tests:

```
npm test
```

Run mutation tests:

```
npx stryker run
```

Mutation report generated at:

```
reports/mutation/mutation.html
```

---

## API Endpoints (Summary)

### Books

* `GET /api/books`
* `GET /api/books/search?q=`
* `POST /api/books`
* `PUT /api/books/:id`
* `DELETE /api/books/:id`

### Users

* `GET /api/users`
* `POST /api/users`

### Borrowing

* `POST /api/borrow`
* `POST /api/borrow/return`
* `GET /api/borrow`

---

## Notes

* In-memory storage; data resets on restart.
* Designed for demonstrating software testing techniques.
