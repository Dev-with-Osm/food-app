const express = require('express');
const {
  registerNewUser,
  loginUser,
  logoutUser,
} = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerNewUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

module.exports = router;
