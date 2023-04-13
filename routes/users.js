const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCurrentUser, updateCurrentUser } = require('../controllers/users');

// GET /users/me
usersRouter.get('/me', getCurrentUser);

// PATCH /users/me
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), updateCurrentUser);

module.exports = usersRouter;
