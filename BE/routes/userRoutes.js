const express = require('express');
const { verifyToken } = require('../utils/verifyUser');
const { updateUser, addDishToCart } = require('../controllers/userConroller');

const router = express.Router();

router.put('/update-user/:id', verifyToken, updateUser);
router.post('/cart/:dishId', verifyToken, addDishToCart);

module.exports = router;
