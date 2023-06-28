const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();

const router = require('./routes');

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(router);
app.use(errors());
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла  ошибка'
        : message,
    });
  // next();
});

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
