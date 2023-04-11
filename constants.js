const errorsTexts = {
  baseError : 'Произошла ошибка',
  userNotFound: 'Пользователь не найден',
  MovieNotFound: 'Фильм не найден',
  incorrectData: 'Введены некорректные данные',
  incorrectId: 'Некорректный id',
  alreadyRegisteredError: 'Пользователь с такими данными уже существует',
  movieAccessError: 'Взаимодействие с чужим сохранённым фильмом невозможно',
  needToAuthoriseError: 'Необходима авторизация',
  incorrectRouteError: 'Некорректный путь',
  incorrectAuthorisation: 'Направильные почта или пароль',
}

const validOperationCode = 200;

module.exports = {
  errorsTexts,
  validOperationCode,
}