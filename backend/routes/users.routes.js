const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users.controllers');
const userRouter = express.Router();

userRouter.get('/', usersController.getAllUsers);

userRouter.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  usersController.signupUser
);

userRouter.post('/login', usersController.loginUser);

module.exports = userRouter;