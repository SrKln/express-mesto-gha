const router = require('express').Router();
const {
  getUsers,
  getUserId,
  getCurrentUser,
  updateProfUser,
  updateAvaUser,
} = require('../controllers/users');

const {
  userIdValidator,
  userInfoValidator,
  userAvatarValidator,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:userId', userIdValidator, getUserId);
router.get('/me', getCurrentUser);
router.patch('/me', userInfoValidator, updateProfUser);
router.patch('/me/avatar', userAvatarValidator, updateAvaUser);
module.exports = router;
