const { Error } = require('mongoose');
const Card = require('../models/card');
const { STATUS } = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(STATUS.OK).send(cards))
    .catch(() => res.status(STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(STATUS.NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        res.status(STATUS.BAD_REQUEST).send({ message: 'Перезаполните данные' });
      } else {
        res.status(STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        res.status(STATUS.BAD_REQUEST).send({ message: 'Перезаполните данные' });
      } else {
        res.status(STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (!card) {
        res.status(STATUS.NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        res.status(STATUS.BAD_REQUEST).send({ message: 'Перезаполните данные' });
      } else {
        res.status(STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (!card) {
        res.status(STATUS.NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(STATUS.OK).send({ data: card });
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        res.status(STATUS.BAD_REQUEST).send({ message: 'Перезаполните данные' });
      } else {
        res.status(STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
