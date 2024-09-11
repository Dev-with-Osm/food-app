const testUserController = (req, res) => {
  try {
    res.status(200).send('<h1>test user Data </h1>');
  } catch (error) {
    console.log('error In Test API ', error);
  }
};

module.exports = { testUserController };
