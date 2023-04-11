const moviesRouter = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');

//GET /movies
moviesRouter.get('/', getMovies);

//POST /movies
moviesRouter.post('/', addMovie);

//DELETE /movies/_id
moviesRouter.delete('/:movieId', deleteMovie);

module.exports = moviesRouter;