const User = require('../models/user');
const { STATUS } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' }));
};

const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(STATUS.NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS.BAD_REQUEST).send({ message: 'Ошибка ввода данных' });
      } else {
        res.status(STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((users) => res.status(STATUS.CREATED).send(users))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS.BAD_REQUEST).send({ message: 'Ошибка ввода данных' });
      } else {
        res.status(STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const updateProfUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(STATUS.NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS.BAD_REQUEST).send({ message: 'Перезаполните данные' });
      } else {
        res.status(STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const updateAvaUser = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(STATUS.NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS.BAD_REQUEST).send({ message: 'Перезаполните данные' });
      } else {
        res.status(STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateProfUser,
  updateAvaUser,
};
