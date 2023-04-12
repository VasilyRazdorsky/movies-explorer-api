const errorsTexts = {
  baseError: 'Произошла ошибка',
  userNotFound: 'Пользователь не найден',
  MovieNotFound: 'Фильм не найден',
  incorrectData: 'Введены некорректные данные',
  incorrectId: 'Некорректный id',
  alreadyRegisteredError: 'Пользователь с такими данными уже существует',
  movieAccessError: 'Взаимодействие с чужим сохранённым фильмом невозможно',
  needToAuthoriseError: 'Необходима авторизация',
  incorrectRouteError: 'Некорректный путь',
  incorrectAuthorisation: 'Направильные почта или пароль',
  serverError: 'На сервере произошла ошибка',
};

const validOperationCode = 200;

const urlPattern = /(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?/i;

module.exports = {
  errorsTexts,
  validOperationCode,
  urlPattern,
};
