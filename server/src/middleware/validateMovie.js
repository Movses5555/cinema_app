const { body, validationResult } = require('express-validator');
const moment = require('moment');

const validateMovie = [
  body('poster')
    .notEmpty().withMessage('Poster is required').bail()
    .isString().withMessage('Poster must be a string'),
  body('title')
    .notEmpty().withMessage('Title is required').bail()
    .isString().withMessage('Title must be a string').bail()
    .isLength({ max: 50 }).withMessage('Title must be at most 50 characters long'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string').bail()
    .isLength({ max: 500 }).withMessage('Description must be at most 500 characters long'),
  body('duration')
    .notEmpty().withMessage('Duration is required').bail()
    .isInt({ min: 1 }).withMessage('Duration must be a positive integer greater than 0'),
  body('seances')
    .notEmpty().withMessage('Seance is required').bail()
    .isArray({ min: 1 }).withMessage('Seance must be a non-empty array.'),
  body('seances.*.roomId')
    .notEmpty().withMessage('Seance room is required'),
  body('seances.*.date')
    .notEmpty().withMessage('Seance date is required').bail()
    .isISO8601().withMessage('Seance date must be a valid date').bail()
      .custom((value) => {
        if (moment(value).isBefore(moment(), 'day')) {
          throw new Error('Seance date must not be in the past');
        }
        return true;
      }),
  body('seances.*.times')
    .notEmpty().withMessage('Seance times is required')
    .isArray({ min: 1 }).withMessage('Seance times must be a non-empty array.'),
  body('seances.*.times.*')
    .notEmpty().withMessage("Seance times can't be empty").bail()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Seance times must be in HH:mm format.'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().reduce((acc, error) => {
        acc[error.path] = error.msg;
        return acc;
      }, {});
      console.log(formattedErrors)
      return res.status(400).json(formattedErrors);
    }
    next();
  },
];

const validateUpdateMovie = [
  body('poster')
    .optional()
    .notEmpty().withMessage('Poster is required').bail()
    .isString().withMessage('Poster must be a string'),
  body('title')
    .optional()
    .notEmpty().withMessage('Title is required').bail()
    .isString().withMessage('Title must be a string').bail()
    .isLength({ max: 50 }).withMessage('Title must be at most 50 characters long'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string').bail()
    .isLength({ max: 500 }).withMessage('Description must be at most 500 characters long'),
  body('duration')
    .optional()
    .notEmpty().withMessage('Duration is required').bail()
    .isInt({ min: 1 }).withMessage('Duration must be a positive integer greater than 0'),
  body('seances')
    .exists()
    .notEmpty().withMessage('Seance is required').bail()
    .isArray({ min: 1 }).withMessage('Seance must be a non-empty array.'),
  body('seances.*.roomId')
    .notEmpty().withMessage('Seance room is required'),
  body('seances.*.date')
    .notEmpty().withMessage('Seance date is required').bail()
    .isISO8601().withMessage('Seance date must be a valid date').bail()
      .custom((value) => {
        if (moment(value).isBefore(moment(), 'day')) {
          throw new Error('Seance date must not be in the past');
        }
        return true;
      }),
  body('seances.*.times')
    .notEmpty().withMessage('Seance times is required').bail()
    .isArray({ min: 1 }).withMessage('Seance times must be a non-empty array.'),
  body('seances.*.times.*')
    .notEmpty().withMessage("Seance times can't be empty").bail()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Seance times must be in HH:mm format.'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().reduce((acc, error) => {
        acc[error.path] = error.msg;
        return acc;
      }, {});
      console.log(formattedErrors)
      return res.status(400).json(formattedErrors);
    }
    next();
  },
];


const validateRoom = [
  body('name')
    .notEmpty().withMessage('Name is required').bail()
    .isString().withMessage('Name must be a string').bail()
    .isLength({ min: 3, max: 25 }).withMessage('Name must be at least 3 and at most 25 characters long'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().reduce((acc, error) => {
        acc[error.path] = error.msg;
        return acc;
      }, {});
      console.log(formattedErrors)
      return res.status(400).json(formattedErrors);
    }
    next();
  },
];

module.exports = {
  validateMovie,
  validateUpdateMovie,
  validateRoom,
}



