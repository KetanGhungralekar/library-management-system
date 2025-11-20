const express = require('express');

const app = express();

app.use(express.json());
const bookRoutes = require('./routes/BookRoutes');
const userRoutes = require('./routes/userRoutes');
// Simple health check endpointss
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Library System API is running' });
});
app.use('/api/books', bookRoutes);
const errorMiddleware = require('./middlewares/errorMiddleware');
app.use(errorMiddleware);
app.use('/api/users', userRoutes);
module.exports = app;
