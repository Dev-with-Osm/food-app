const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        name: {
          type: String,
        },
      },
    ],
    isOnMenuToday: {
      type: Boolean,
      default: true,
    },
    dishImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Dish', dishSchema);
