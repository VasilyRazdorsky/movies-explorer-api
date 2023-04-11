const User = require('../models/user');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { errorsTexts, validOperationCode } = require('../constants');
const ValidationError = require('../errors/IncorrectDataError');
const AlreadyRegisteredError = require('../errors/AlreadyRegisteredError');
const IncorrectAuthorisationError = require('../errors/IncorrectAuthorisationError');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
  .then((hash) => User.create({ name, email, password: hash }))
  .then((user) => res.status(validOperationCode).send({ name: user.name, email: user.email }))
  .catch((error) => {
    let err = error;
    if (err.code === 11000) {
      err = new AlreadyRegisteredError(errorsTexts.alreadyRegisteredError);
    } else if (error.name === 'ValidationError') {
      err = new ValidationError(errorsTexts.incorrectData);
    }
    next(err);
  })
}

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
  .then((user) => {
    if(!user) {
      throw new IncorrectAuthorisationError(errorsTexts.incorrectAuthorisation);
    }

    return bcrypt.compare(password, user.password)
    .then((matched) => {
      if(!matched) {
        throw new IncorrectAuthorisationError(errorsTexts.incorrectAuthorisation);
      }

      return user;
    });
  })
  .then((user) => {
    const jwt = jsonwebtoken.sign({_id : user._id}, 'dev_secret', { expiresIn: '7d' });

    return res.status(validOperationCode).send({ jwt });
  })
  .catch((error) => {
    next(error);
  })
}

module.exports = {
  createUser,
  login,
}