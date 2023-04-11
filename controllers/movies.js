const Movie = require('../models/movie');
const { errorsTexts, validOperationCode } = require('../constants')
const NotFoundError = require('../errors/NotFoundError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const AccessError = require('../errors/AccessError');

const getMovies = (req, res, next) => {
  Movie.find({}).populate(['owner'])
  .then((movies) => {
    return res.status(validOperationCode).json(movies);
  })
  .catch((error) => {
    next(error);
  })
}

const addMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId} = req.body;

  Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
  .then((movie) => {
    return res.status(validOperationCode).json(movie);
  })
  .catch((error) => {
    let err = error;
    if(error.name === 'ValidationError') {
      err = new IncorrectDataError(errorsTexts.incorrectData);
    }
    next(err);
  });
}

const deleteMovie = (req, res, next) => {
  const movieId = req.params.movieId;

  Movie.findById(movieId)
  .then((movie) => {
    if(!movie) {
      throw new NotFoundError(errorsTexts.MovieNotFound);
    }

    if(movie.owner.equals(req.user._id.toString())){
      Movie.findByIdAndDelete(movie._id)
      .then((deletedMovie) => {
        return res.status(validOperationCode).json(deletedMovie)
      })
      .catch((error) => {
        error = new IncorrectDataError(errorsTexts.incorrectId)
        next(error);
      });
    } else {
      throw new AccessError(errorsTexts.movieAccessError);
    }
  })
  .catch((error) => {
    let err = error;
    if(error.name === 'CastError'){
      err = new IncorrectDataError(errorsTexts.incorrectId);
    }
    next(err);
  })
}

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
}