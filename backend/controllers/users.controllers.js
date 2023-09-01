const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const FailedAuthorizationError = require('../errors/failedAuthorization.error');

const User = require('../models/user.model');

const getAllUsers = async (req, res, next) => {
  let users;
  users = await User.find({}, '-password');

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signupUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new Error('Bad request', 400));
  }

  const { username, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return next(new Error('Email already in use', 409));
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    username: username,
    email: email.toLowerCase(),
    password: hashedPassword,
    posters: [],
  });

  await newUser.save();

  token = jwt.sign(
    { userId: newUser.userId, email: newUser.email },
    process.env.JWT_KEY,
    { expiresIn: '1h' }
  );

  res
    .status(201)
    .json({ userId: newUser.userId, email: newUser.email, token: token });
};

const loginUser = async (req, res, next) => {
  const { inputEmail, inputPassword } = req.body;

  const user = await User.findOne({ email: inputEmail.toLowerCase() });

  if (!user) {
    return next(new FailedAuthorizationError('Unauthorized'));
  }

  const isValidPassword = await bcrypt.compare(inputPassword, user.password);
  if (!isValidPassword) {
    return next(new FailedAuthorizationError('Unauthorized'));
  }

  const token = jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.JWT_KEY,
    { expiresIn: '1h' }
  );

  res.json({ userId: user._id, email: user.email, token: token });
};

exports.getUsers = getAllUsers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;
