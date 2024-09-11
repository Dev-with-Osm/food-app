const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
const registerNewUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if the user already exists
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(409).json({
        message: 'User already exists',
        success: false,
        data: null,
      });
    }

    // Validate the email domain
    const emailPattern = /.*\.(employee|admin)@onee\.ma$/;
    const isValidEmail = emailPattern.test(email);

    if (!isValidEmail) {
      return res.status(400).json({
        message: 'Invalid email domain.',
        success: false,
        data: null,
      });
    }

    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign role based on the email pattern
    const role = email.endsWith('.admin@onee.ma') ? 'admin' : 'user';

    // Create the new user with the assigned role
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    });

    // Generate JWT token with expiration
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '5d',
    });

    // Send response with token in cookie
    res
      .status(201)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json({
        message: 'User registered successfully',
        success: true,
        data: {
          user: newUser,
          token,
        },
      });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong, try later',
      success: false,
      data: null,
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        message: 'User not found',
        success: false,
        data: null,
      });

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({
        message: 'Invalid Credentials',
        success: false,
        data: null,
      });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '5d',
    });

    // Exclude sensitive data from response
    const { password: pass, ...rest } = user._doc;

    // Send response with token in cookie
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json({
        message: 'Login successful',
        success: true,
        data: {
          user: rest,
          token,
        },
      });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong, try later',
      success: false,
      data: null,
    });
  }
};

// Logout user
const logoutUser = async (req, res) => {
  try {
    res
      .cookie('access_token', '', { expires: new Date(0), httpOnly: true })
      .json({
        message: 'Logged out successfully',
        success: true,
        data: null,
      });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong, try later',
      success: false,
      data: null,
    });
  }
};

module.exports = { registerNewUser, loginUser, logoutUser };
