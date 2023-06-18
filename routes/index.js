const router = require('express').Router();
const { STATUS } = require('../utils/constants');

const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/', (req, res) => {
  res.status(STATUS.NOT_FOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;
