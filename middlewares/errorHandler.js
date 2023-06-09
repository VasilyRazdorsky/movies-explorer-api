const { errorsTexts } = require('../constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? errorsTexts.serverError : message,
  });
  next();
};

module.exports = errorHandler;
