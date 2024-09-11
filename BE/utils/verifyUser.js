const jwt = require('jsonwebtoken');

module.exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token)
      return res
        .status(401)
        .json({ message: 'Unauthorised', success: false, data: null });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err)
        return res
          .status(403)
          .json({ message: 'Forbidden ', success: false, data: null });
      req.user = user;
      next();
    });
  } catch (error) {
    console.log({ error });

    res.status(500).json({
      message: 'Something went wrong, try later',
      success: false,
      data: null,
    });
  }
};
