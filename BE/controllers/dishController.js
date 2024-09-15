const Dish = require('../models/dishModel');

const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json({
      message: 'Dishes fetched successfully',
      success: true,
      data: dishes,
    });
  } catch (error) {
    console.error('Error get all dishes:', error);
    res.status(500).json({
      message: 'Something went wrong. Please try again later.',
      success: false,
      data: error.message,
    });
  }
};
const getSingleDish = async (req, res) => {
  const { dishId } = req.params;

  try {
    const dish = await Dish.findById(dishId);
    res.status(200).json({
      message: 'Dishes fetched successfully',
      success: true,
      data: dish,
    });
  } catch (error) {
    console.error('Error get all dishes:', error);
    res.status(500).json({
      message: 'Something went wrong. Please try again later.',
      success: false,
      data: error.message,
    });
  }
};

module.exports = { getAllDishes, getSingleDish };
