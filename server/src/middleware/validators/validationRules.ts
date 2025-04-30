import { param, query } from 'express-validator';
import {
  createStringValidation,
  createIntParamValidation,
  createIntQueryValidation,
} from '../../utils/validationHelpers.js';

const limitRule = [createIntQueryValidation('limit', 1, 50)];
const offsetRule = [createIntQueryValidation('offset', 0)];

const idIntRule = [createIntParamValidation('id', 1)];
const idStringRule = [
  param('id')
    .isLength({ min: 26, max: 26 })
    .withMessage('Длина идентификатора должна быть ровно 26 символов..'),
];

const ratingIdRule = [createIntParamValidation('ratingId', 1)];

const booksSearchQueriesRules = [
  query('title')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Название должно быть строкой длиной от 1 до 255 символов..'),

  query('description')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage(
      'Описание должно представлять собой строку длиной от 1 до 500 символов.'
    ),

  query('author')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(
      'Имя агента должно представлять собой строку длиной от 1 до 100 символов.'
    ),

  query('publisher')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(
      'Publisher name must be a string between 1 and 100 characters long.'
    ),

  query('publishedDate')
    .optional()
    .isString()
    .trim()
    .matches(/^\d{3,4}(-\d{2})?(-\d{2})?$/)
    .withMessage(
      'Дата публикации должна быть в формате YYYY, YYYY-MM или YYYY-MM-DD.'
    ),

  query('category')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(
      'Категория должна быть строкой длиной от 1 до 100 символов..'
    ),
];

const ratingsSearchQueriesRules = [
  query('reviewHelpfulness')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(
      'Полезность отзыва должна представлять собой строку длиной от 1 до 255 символов.'
    ),

  query('reviewScore')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(
      'Оценка обзора должна представлять собой строку длиной от 1 до 255 символов.'
    ),

  query('reviewSummary')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(
      'Краткое содержание комментария должно представлять собой строку длиной от 1 до 255 символов.'
    ),

  query('reviewText')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage(
      'Текст отзыва должен представлять собой строку длиной от 1 до 500 символов.'
    ),
];

const createBookRules = [
  createStringValidation(
    'title',
    1,
    255,
    'Заголовок обязателен и должен содержать от 2 до 100 символов.'
  ),
  createStringValidation('description', 2, 500, 'Description is required.'),
  createStringValidation(
    'author',
    2,
    100,
    'Необходимо указать агента, длина имени должна быть от 2 до 100 символов..'
  ),
  createStringValidation(
    'image',
    2,
    255,
    'Изображение обязательно и должно быть длиной от 2 до 255 символов.'
  ),
  createStringValidation(
    'publisher',
    2,
    100,
    'Обязательно укажите клиента, его длина должна составлять от 2 до 100 символов.'
  ),
  createStringValidation(
    'publishedDate',
    2,
    50,
    'Поле дата публикации обязательно и должно содержать от 2 до 50 символов..'
  ),
  createStringValidation(
    'infoLink',
    2,
    255,
    'Дополнительная информация обязателена и должен содержать от 2 до 255 символов.'
  ),
  createStringValidation(
    'category',
    1,
    100,
    'Категория обязательна и не может быть пустой. Длина поля должна быть от 1 до 100 символов.'
  ),
];

const createRatingRules = [
  createIntParamValidation('bookId', 1),
  createStringValidation(
    'reviewHelpfulness',
    1,
    255,
    'Полезность обязательна'
  ),
  createStringValidation(
    'reviewScore',
    1,
    3,
    'Оценка обзора обязательна и должна быть длиной от 1 до 3 символов.'
  ),
  createStringValidation(
    'reviewSummary',
    1,
    255,
    'Краткое описание обязательно и должно содержать от 1 до 255 символов.'
  ),
  createStringValidation(
    'reviewText',
    1,
    500,
    'Текст отзыва обязателен и должен содержать от 1 до 500 символов.'
  ),
];

const createUserRules = [
  createStringValidation('name', 2, 50)
    .matches(/^[A-Za-z0-9]+(?:[_@ -][A-Za-z0-9]+)*$/)
    .withMessage(
      'Имя может содержать только буквы, пробелы, _, @, - и не может содержать несколько специальных символов подряд.'
    ),
];

const createRegisterUserRules = [
  createStringValidation(
    'password',
    6,
    50,
    'Пароль обязателен и должен содержать от 6 до 50 символов.'
  ),
];

const refreshTokenRule = [
  createStringValidation('refreshToken', 1, 1000, 'Требуется обновить токен'),
];

const postCategoryRule = [
  createStringValidation(
    'name',
    1,
    100,
    'Имя обязательно и должно содержать от 1 до 100 символов.'
  ),
];

const changePasswordRules = [
  createStringValidation('oldPassword', 6, 50, 'Требуется старый пароль'),
  createStringValidation(
    'newPassword',
    6,
    50,
    'Новый пароль должен быть длиной не менее 6 символов.'
  ),
];

const patchBookRules = createBookRules.map((rule) => rule.optional());
const patchRatingRules = createRatingRules.map((rule) => rule.optional());
const patchUserRules = createUserRules.map((rule) => rule.optional());

export {
  limitRule,
  offsetRule,
  idIntRule,
  idStringRule,
  ratingIdRule,
  booksSearchQueriesRules,
  ratingsSearchQueriesRules,
  createBookRules,
  createRatingRules,
  createUserRules,
  postCategoryRule,
  patchBookRules,
  patchRatingRules,
  patchUserRules,
  createRegisterUserRules,
  refreshTokenRule,
  changePasswordRules,
};
