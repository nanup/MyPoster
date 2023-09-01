const express = require('express');

const usersControllers = require('../controllers/users.controllers');
const { check } = require('express-validator');

const userRouter = express.Router();

userRouter.get('/', usersControllers.getUsers);

userRouter.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  usersControllers.signupUser
);

userRouter.post('/login', usersControllers.loginUser);

module.exports = userRouter;
