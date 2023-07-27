require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { corsMiddleware } = require('./middlewares/cors');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const app = express();
const { PORT = 3000 } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
});
mongoose.connect('mongodb://localhost:27017/mestodb', { family: 4 });
app.use(corsMiddleware);
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  login,
);
app.post(
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
app.use(auth);
app.use(cardsRouter);
app.use(usersRouter);
app.use(errorLogger);
app.use('*', () => NotFoundError('Некорректный URL'));
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.statusCode === 500 ? 'Ошибка на сервере' : err.message;
  res.status(status).json({ message });
});
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Все гуд, порт ${PORT} заведен!`);
});
