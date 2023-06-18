const router = require('express').Router();
const {
  getUsers,
  getUserId,
  createUser,
  updateProfUser,
  updateAvaUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:_id', getUserId);
router.post('/', createUser);
router.patch('/me', updateProfUser);
router.patch('/me/avatar', updateAvaUser);
module.exports = router;
