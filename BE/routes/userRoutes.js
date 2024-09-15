const express = require('express');
const { verifyToken } = require('../utils/verifyUser');
const {
  updateUser,
  addDishToCart,
  getUserCart,
  removeDishFromCart,
  clearCart,
} = require('../controllers/userConroller');

const router = express.Router();

router.put('/update-user/:id', verifyToken, updateUser);
router.post('/cart/:dishId', verifyToken, addDishToCart);
router.get('/cart', verifyToken, getUserCart);
router.delete('/cart/:dishId', verifyToken, removeDishFromCart);
router.put('/cart/clear-cart', verifyToken, clearCart);

module.exports = router;
