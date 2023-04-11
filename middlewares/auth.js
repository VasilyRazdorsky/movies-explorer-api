const jsonwebtoken = require('jsonwebtoken');
const { errorsTexts } = require('../constants');
const IncorrectAuthorisationError = require('../errors/IncorrectAuthorisationError');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if(!authorization || !authorization.startsWith('Bearer')){
      throw new IncorrectAuthorisationError(errorsTexts.needToAuthoriseError);
    }

    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jsonwebtoken.verify(token, 'dev_secret');
    } catch(error) {
      throw new IncorrectAuthorisationError(errorsTexts.needToAuthoriseError);
    }

    req.user = payload;

    next();
  } catch(error) {
    next(error);
  }
}