
const errorHandler = (err, req, res, next) => {
    let message = err?.message || 'Internal Server Error';
    
    if (err?.name === 'SequelizeUniqueConstraintError') {
      message = err?.errors?.[0]?.message;
    }
    
    if (res.headersSent) {
      return next(err);
    }
    res.status(err.statusCode || 500).json({ message });
};

module.exports = {
    errorHandler,
};