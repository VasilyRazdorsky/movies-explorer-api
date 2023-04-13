const moviesRouter = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { validateAddMovie, validateDeleteMovie } = require('../middlewares/validators');

// GET /movies
moviesRouter.get('/', getMovies);

// POST /movies
moviesRouter.post('/', validateAddMovie, addMovie);

// DELETE /movies/_id
moviesRouter.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = moviesRouter;
