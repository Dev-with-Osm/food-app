const express = require('express');
const { verifyToken } = require('../utils/verifyUser');
const {
  addNewDish,
  editDish,
  toggleIsOnMenuToday,
  deleteDish,
} = require('../controllers/adminController');
const router = express.Router();

router.post('/add-dish', verifyToken, addNewDish);
router.put('/edit-dish/:dishId', verifyToken, editDish);
router.delete('/delete-dish/:dishId', verifyToken, deleteDish);
router.put('/toggle-is-on-menu/:dishId', verifyToken, toggleIsOnMenuToday);

module.exports = router;
