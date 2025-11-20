function errorMiddleware(err, req, res, next) {
  console.error('[ERROR]', err.message);

  res.status(err.statusCode || 500).json({
    error: err.name || 'Error',
    message: err.message
  });
}

module.exports = errorMiddleware;
