const usersRouter = require('express').Router();
const { getCurrentUser, updateCurrentUser } = require('../controllers/users');
const { validateUpdateCurrentUser } = require('../middlewares/validators');

// GET /users/me
usersRouter.get('/me', getCurrentUser);

// PATCH /users/me
usersRouter.patch('/me', validateUpdateCurrentUser, updateCurrentUser);

module.exports = usersRouter;
