require('dotenv').config();

const { DB_URL } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());

app.use(requestLogger);

app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

mongoose.connect(DB_URL, {
  useNewURLParser: true,
}).then(() => {
  app.listen(PORT);
});
