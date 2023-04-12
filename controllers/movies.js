const Movie = require('../models/movie');
const { errorsTexts, validOperationsCodes } = require('../constants');
const NotFoundError = require('../errors/NotFoundError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const AccessError = require('../errors/AccessError');

const getMovies = (req, res, next) => {
  Movie.find({}).populate(['owner'])
    .then((movies) => res.status(
      validOperationsCodes.validOperationCode,
    ).json(movies))
    .catch((error) => {
      next(error);
    });
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(validOperationsCodes.validCreationCode).json(movie))
    .catch((error) => {
      let err = error;
      if (error.name === 'ValidationError') {
        err = new IncorrectDataError(errorsTexts.incorrectData);
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorsTexts.MovieNotFound);
      }

      if (movie.owner.equals(req.user._id.toString())) {
        Movie.findByIdAndDelete(movie._id)
          .then((deletedMovie) => res.status(validOperationsCodes.validOperationCode)
            .json(deletedMovie))
          .catch(() => {
            const err = new IncorrectDataError(errorsTexts.incorrectId);
            next(err);
          });
      } else {
        throw new AccessError(errorsTexts.movieAccessError);
      }
    })
    .catch((error) => {
      let err = error;
      if (error.name === 'CastError') {
        err = new IncorrectDataError(errorsTexts.incorrectId);
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
