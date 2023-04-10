const moviesRouter = require('express').Router();

//GET /movies
moviesRouter.get('/', () => { console.log("getMovies") });

//POST /movies
moviesRouter.post('/', () => { console.log("addMovie") });

//DELETE /movies/_id
moviesRouter.delete('/:movieId', () => { console.log("deleteMovie") });

module.exports = moviesRouter;