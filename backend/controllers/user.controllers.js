const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const FailedAuthorizationError = require('../errors/failedAuthorization.error');
const BadRequestError = require('../errors/badRequest.error');
const ConflictError = require('../errors/conflict.error');

const User = require('../models/user.model');

const getAllUsers = async (req, res, next) => {
  let users;
  users = await User.find({}, '-password');

  res.json({ users: users.map((user) => user.toObject()) });
};

const signupUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new BadRequestError('Invalid inputs!'));
  }

  const { username, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return next(new ConflictError('Email already in use!'));
  }

  user = await User.findOne({ username });
  if (user) {
    return next(new ConflictError('Username already in use!'));
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

  return res
    .status(201)
    .json({ userId: newUser._id, email: newUser.email, token: token });
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

exports.getAllUsers = getAllUsers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;
