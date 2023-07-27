const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const NotFoundError = require('../errors/NotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  login,
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /^(http|https):\/\/(www\.)?[\w\-._~:/?#]+(?:\.[\w\-._~:/?#]+)+#?$/,
      ),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  createUser,
);
router.use(auth);
router.use(cardsRouter);
router.use(usersRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Некорректный URL'));
});
module.exports = router;
