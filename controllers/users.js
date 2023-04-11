const User = require('../models/user');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { errorsTexts, validOperationCode } = require('../constants');
const IncorrectDataError = require('../errors/IncorrectDataError');
const AlreadyRegisteredError = require('../errors/AlreadyRegisteredError');
const IncorrectAuthorisationError = require('../errors/IncorrectAuthorisationError');
const NotFoundError = require('../errors/NotFoundError');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
  .then((hash) => User.create({ name, email, password: hash }))
  .then((user) => res.status(validOperationCode).json({ name: user.name, email: user.email }))
  .catch((error) => {
    let err = error;
    if (err.code === 11000) {
      err = new AlreadyRegisteredError(errorsTexts.alreadyRegisteredError);
    } else if (error.name === 'ValidationError') {
      err = new IncorrectDataError(errorsTexts.incorrectData);
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

    return res.status(validOperationCode).json({ jwt });
  })
  .catch((error) => {
    next(error);
  })
}

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
  .then((user) => {
    if(!user) {
      throw new NotFoundError(errorsTexts.userNotFound);
    }

    return res.status(validOperationCode).json(user);
  })
  .catch((error) => {
    next(error);
  })
}

const updateCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;

  User.findByIdAndUpdate(userId, { email, name }, {
    new: true,
    runValidators: true,
  })
  .then((user) => {
    if(!user) {
      throw new NotFoundError(errorsTexts.userNotFound);
    }

    return res.status(validOperationCode).json(user);
  })
  .catch((error) => {
    let err = error;
    if(error.name === 'ValidationError') {
      err = new IncorrectDataError(errorsTexts.incorrectData);
    }
    next(err);
  });
}

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
}