const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMS: 60 * 1000, // 1 minute
  max: 50, // limit 50 requests
  message: 'Вы можете делать только 50 запросов в минуту',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
