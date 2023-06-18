const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3004 } = process.env;

const app = express();
const router = require('./routes');

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '648dd44087010cca47c07ae3',
  };

  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
