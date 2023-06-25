const { Error } = require('mongoose');
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
      if (err instanceof Error.CastError) {
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
      if (err instanceof Error.ValidationError) {
        res.status(STATUS.BAD_REQUEST).send({ message: 'Ошибка ввода данных' });
      } else {
        res.status(STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const updateUser = (req, res, updateData) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(STATUS.NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ user });
      }
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        res.status(STATUS.BAD_REQUEST).send({ message: 'Перезаполните данные' });
      } else {
        res.status(STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const updateProfUser = (req, res) => {
  const { name, about } = req.body;
  updateUser(req, res, { name, about });
};

const updateAvaUser = (req, res) => {
  const { avatar } = req.body;
  updateUser(req, res, { avatar });
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateProfUser,
  updateAvaUser,
};
