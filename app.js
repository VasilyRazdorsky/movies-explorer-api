const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const { errorsTexts } = require('./constants');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3001 } = process.env;

const app = express();

app.use(bodyParser.json());

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.use('*', (req, res, next) => {
  const err = new NotFoundError(errorsTexts.incorrectRouteError);
  next(err);
})

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? errorsTexts.serverError: message,
  });
  next();
})

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewURLParser: true,
}).then(() => {
  app.listen(PORT);
});

