require('dotenv').config();

const { DB_URL } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors, celebrate, Joi } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const errorHandler = require('./middlewares/errorHandler');
const { createUser, login } = require('./controllers/users');
const { errorsTexts } = require('./constants');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());

app.use(requestLogger);

app.use(limiter);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.use('*', (req, res, next) => {
  const err = new NotFoundError(errorsTexts.incorrectRouteError);
  next(err);
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

mongoose.connect(DB_URL, {
  useNewURLParser: true,
}).then(() => {
  app.listen(PORT);
});
