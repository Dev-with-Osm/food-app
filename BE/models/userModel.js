const mongoose = require('mongoose');

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
    cart: {
      type: [
        {
          name: { type: String, required: true },
          category: { type: String, required: true },
          quantity: { type: Number, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
