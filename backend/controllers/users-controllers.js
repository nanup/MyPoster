const uuid = require("uuid");
const { validationResult } = require("express-validator");

const User = require("../models/user");
const httpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    userid: "u1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "test",
  },
];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new httpError(err.message, 500);
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signupUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new httpError("Invalid inputs", 422));
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new httpError("Signup failed, please try again later", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new httpError("User already exists", 422);
    return next(error);
  }

  const newUser = new User({
    name,
    email,
    image: "https://picsum.photos/200/300",
    password,
    posters: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new httpError(err.message, 500));
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const hasUser = await User.findOne({ email });

  if (!hasUser || hasUser.password !== password) {
    return next(new httpError("User credentials are wrong", 401));
  } else {
    res.json({ message: "logged in" });
  }
};

exports.getUsers = getUsers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;
