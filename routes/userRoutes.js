const express = require('express');
const { register, login, logout } = require('../controllers/userController.js')
const { verifyToken } = require('../middlewares/verifyToken.js')

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/logout', verifyToken, logout)

module.exports = { userRouter }