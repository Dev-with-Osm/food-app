const mongoose = require('mongoose');
// const colors

const dbConn = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to Database'.white.bgYellow);
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConn;
