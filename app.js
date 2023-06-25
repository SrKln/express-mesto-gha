const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();
const router = require('./routes');

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '64985f7765bfe6dbc0d95b74',
  };

  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
