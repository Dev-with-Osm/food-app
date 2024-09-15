const User = require('../models/userModel.js');
const Dish = require('../models/dishModel.js');

const updateUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        message: "You can't update this user",
        success: false,
        data: null,
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
      },
      { new: true },
    );
    const { password, ...rest } = updatedUser._doc;
    res
      .status(200)
      .json({ message: 'successfully updated', success: true, data: rest });
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      message: 'Something went wrong, try later',
      success: false,
      data: null,
    });
  }
};

const addDishToCart = async (req, res) => {
  const userId = req.user.id; // Assuming you have user data in the request (e.g., from middleware)
  const { dishId } = req.params;

  try {
    // Check if the dish exists
    const dish = await Dish.findById(dishId);

    if (!dish) {
      return res.status(404).json({
        message: 'Dish not found',
        success: false,
        data: null,
      });
    }

    // Find the user and populate the cart with full dish details (name, category, etc.)
    const user = await User.findById(userId).populate({
      path: 'cart',
      populate: { path: 'dish' }, // Ensure the entire dish object is populated
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
        data: null,
      });
    }

    // Check if the user already has a dish from the same category in the cart
    const dishWithSameCategory = user.cart.some((cartItem) => {
      return cartItem.dish && cartItem.dish.category === dish.category;
    });

    if (dishWithSameCategory) {
      return res.status(400).json({
        message: `You already have a dish from the ${dish.category} category in your cart.`,
        success: false,
        data: null,
      });
    }

    // Add new dish to the cart
    const newCartItem = {
      dish: dishId, // Reference the dish by its ObjectId
    };

    user.cart.push(newCartItem);

    await user.save();

    res.status(200).json({
      message: 'Dish added to cart successfully',
      success: true,
      data: dishId,
    });
  } catch (error) {
    console.error('Error adding dish to cart:', error);
    res.status(500).json({
      message: 'Something went wrong, try later',
      success: false,
      data: null,
    });
  }
};

const getUserCart = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId).populate({
      path: 'cart',
      populate: { path: 'dish' },
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
        data: null,
      });
    }

    // Respond with the user's cart
    res.status(200).json({
      message: 'User cart retrieved successfully',
      success: true,
      data: user.cart, // Return the user's cart items
    });
  } catch (error) {
    console.error('Error retrieving user cart:', error);
    res.status(500).json({
      message: 'Something went wrong, try later',
      success: false,
      data: null,
    });
  }
};
const removeDishFromCart = async (req, res) => {
  const userId = req.user.id; // Assuming you have user data in the request (e.g., from middleware)
  const { dishId } = req.params;

  try {
    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
        data: null,
      });
    }

    // Check if the dish is in the user's cart
    const cartItemIndex = user.cart.findIndex(
      (cartItem) => cartItem.dish.toString() === dishId,
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({
        message: 'Dish not found in cart',
        success: false,
        data: null,
      });
    }

    // Remove the dish from the cart
    user.cart.splice(cartItemIndex, 1);

    await user.save();

    res.status(200).json({
      message: 'Dish removed from cart successfully',
      success: true,
      data: dishId,
    });
  } catch (error) {
    console.error('Error removing dish from cart:', error);
    res.status(500).json({
      message: 'Something went wrong, try later',
      success: false,
      data: null,
    });
  }
};

const clearCart = async (req, res) => {
  const userId = req.user.id; // Assuming you have user data in the request (e.g., from middleware)

  try {
    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
        data: null,
      });
    }

    // Clear the cart
    user.cart = [];

    // Save the updated user document
    await user.save();

    res.status(200).json({
      message: 'Cart cleared successfully',
      success: true,
      data: null,
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      message: 'Something went wrong, try later',
      success: false,
      data: null,
    });
  }
};

module.exports = {
  updateUser,
  addDishToCart,
  getUserCart,
  removeDishFromCart,
  clearCart,
};
