const usersRouter = require('express').Router();
const { getCurrentUser, updateCurrentUser } = require('../controllers/users');

//GET /users/me
usersRouter.get('/me', getCurrentUser);

//PATCH /users/me
usersRouter.patch('/me', updateCurrentUser);

module.exports = usersRouter;