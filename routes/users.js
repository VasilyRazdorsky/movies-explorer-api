const usersRouter = require('express').Router();

//GET /users/me
usersRouter.get('/me', () => { console.log("getCurrentUser") })

//PATCH /users/me
usersRouter.patch('/me', () => { console.log("updateCurrentUser") })

module.exports = usersRouter;