const express = require('express');
const {
  getAllDishes,
  getSingleDish,
} = require('../controllers/dishController');

const router = express.Router();

router.get('/', getAllDishes);
router.get('/:dishId', getSingleDish);

module.exports = router;
