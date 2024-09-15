const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for each cart item
const cartItemSchema = {
  dish: {
    type: Schema.Types.ObjectId,
    ref: 'Dish', // Reference to the Dish model
    required: true,
  },
};

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    role: {
      type: String,
      default: 'user',
    },
    cart: [cartItemSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
