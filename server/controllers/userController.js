const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: 'User already exists! Login Instead' });
  }else{
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  
  try {
    await user.save();
  return res.status(200).json({ message: user });

  } catch (err) {
    console.log(err);
  }
}
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      return new Error(err);
    }

    if (!existingUser) {
      return res.status(304).json({ message: 'User not found. Register Please' });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Inavlid Email / Password' });
    }
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1 hr',
      }
    );

    if (req.cookies[`${existingUser._id}`]) {
      req.cookies[`${existingUser._id}`] = '';
    }

    res.cookie(String(existingUser._id), token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 3600), // 1 hr
      httpOnly: true,
      sameSite: 'lax',
    });

    return res
      .status(200)
      .json({ message: 'Successfully Logged In', user: existingUser});
  } catch (err) {
    return new Error(err);
  }
};

const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split('=')[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Authentication failed' });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = '';
    return res.status(200).json({ message: 'Successfully Logged Out' });
  });
};

module.exports = { register, login, logout };
