const Dish = require('../models/dishModel');
const User = require('../models/userModel');

// Helper function to check if the user is an admin
const checkAdminPrivileges = async (userId, res) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
        data: null,
      });
    }

    if (user.role !== 'admin') {
      return res.status(401).json({
        message: 'Unauthorized: You are not an admin',
        success: false,
        data: null,
      });
    }

    return true;
  } catch (error) {
    console.error('Error checking admin privileges:', error);
    return res.status(500).json({
      message: 'Something went wrong. Please try again later.',
      success: false,
      data: null,
    });
  }
};

// Add a new dish
const addNewDish = async (req, res) => {
  const userId = req.user.id;

  const isAdmin = await checkAdminPrivileges(userId, res);
  if (isAdmin !== true) return; // Stop execution if not admin

  try {
    const dish = await Dish.create(req.body);

    res.status(201).json({
      message: 'Dish successfully added',
      success: true,
      data: dish,
    });
  } catch (error) {
    console.error('Error adding dish:', error);
    res.status(500).json({
      message: 'Something went wrong. Please try again later.',
      success: false,
      data: error.message,
    });
  }
};

// Edit an existing dish
const editDish = async (req, res) => {
  const userId = req.user.id;
  const { dishId } = req.params;

  const isAdmin = await checkAdminPrivileges(userId, res);
  if (isAdmin !== true) return;

  try {
    const dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({
        message: 'Dish not found',
        success: false,
        data: null,
      });
    }

    const updatedDish = await Dish.findByIdAndUpdate(
      dishId,
      { $set: req.body },
      { new: true },
    );

    res.status(200).json({
      message: 'Dish successfully updated',
      success: true,
      data: updatedDish,
    });
  } catch (error) {
    console.error('Error updating dish:', error);
    res.status(500).json({
      message: 'Something went wrong. Please try again later.',
      success: false,
      data: error.message,
    });
  }
};

// Toggle the dish availability on today's menu
const toggleIsOnMenuToday = async (req, res) => {
  const userId = req.user.id;
  const { dishId } = req.params;

  const isAdmin = await checkAdminPrivileges(userId, res);
  if (isAdmin !== true) return;

  try {
    const dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({
        message: 'Dish not found',
        success: false,
        data: null,
      });
    }

    const updatedDish = await Dish.findByIdAndUpdate(
      dishId,
      { $set: { isOnMenuToday: !dish.isOnMenuToday } },
      { new: true },
    );

    res.status(200).json({
      message: `Dish ${
        updatedDish.isOnMenuToday ? 'is now' : 'is no longer'
      } on today's menu`,
      success: true,
      data: updatedDish,
    });
  } catch (error) {
    console.error('Error toggling dish availability:', error);
    res.status(500).json({
      message: 'Something went wrong. Please try again later.',
      success: false,
      data: error.message,
    });
  }
};

const deleteDish = async (req, res) => {
  const userId = req.user.id;
  const { dishId } = req.params;
  const isAdmin = await checkAdminPrivileges(userId, res);
  if (isAdmin !== true) return;
  try {
    const dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({
        message: 'Dish not found',
        success: false,
        data: null,
      });
    }
    await dish.deleteOne();
    res.status(200).json({
      message: 'Dish deleted successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error toggling dish availability:', error);
    res.status(500).json({
      message: 'Something went wrong. Please try again later.',
      success: false,
      data: error.message,
    });
  }
};

const getAllDishes = async (req, res) => {
  const userId = req.user.id;

  const isAdmin = await checkAdminPrivileges(userId, res);
  if (isAdmin !== true) return;
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
  const userId = req.user.id;
  const { dishId } = req.params;

  const isAdmin = await checkAdminPrivileges(userId, res);
  if (isAdmin !== true) return;
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

module.exports = {
  addNewDish,
  editDish,
  toggleIsOnMenuToday,
  deleteDish,
  getSingleDish,
  getAllDishes,
};
