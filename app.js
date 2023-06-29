const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const { limiterConfig } = require('./utils/config');

const app = express();

const router = require('./routes');
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');

app.use(helmet());
const limiter = rateLimit(limiterConfig);
app.use(limiter);

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(router);
app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
