const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  try {
    const token = cookies.split('=')[1];
    if (!token) {
      res.status(404).json({ message: 'No token found' });
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(400).json({ message: 'Invalid Token' });
      } else {
        req.id = user.id;
      }
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { verifyToken };
