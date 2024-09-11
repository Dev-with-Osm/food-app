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
  const userId = req.user.id;
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

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
        data: null,
      });
    }

    // Check if there's already a dish from the same category in the cart
    const categoryExistsInCart = user.cart.some((item) => {
      return item.category === dish.category;
    });

    if (categoryExistsInCart) {
      return res.status(400).json({
        message: `A dish from the '${dish.category}' category is already in your cart.`,
        success: false,
        data: null,
      });
    }

    // Add new dish to the cart with quantity 1
    user.cart.push({
      name: dish.name,
      category: dish.category,
      quantity: 1, // Ensure quantity is always 1
    });

    // Save the updated user
    await user.save();

    res.status(200).json({
      message: 'Dish added to cart successfully',
      success: true,
      data: user.cart,
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

module.exports = { updateUser, addDishToCart };
