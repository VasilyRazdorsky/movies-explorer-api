const express = require('express');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { errorsTexts } = require('../constants');
const { validateSignUp, validateSignIn } = require('../middlewares/validators');

const routes = express.Router();

routes.post('/signup', validateSignUp, createUser);
routes.post('/signin', validateSignIn, login);

routes.use(auth);

routes.use('/users', usersRouter);
routes.use('/movies', moviesRouter);

routes.use('*', (req, res, next) => {
  const err = new NotFoundError(errorsTexts.incorrectRouteError);
  next(err);
});

module.exports = routes;
