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

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signupUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new httpError("Invalid inputs", 422));
  }

  const { name, email, password, posters } = req.body;

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
    posters,
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new httpError(err.message, 500));
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  if (hasUser) {
    throw new httpError("Email already in use", 462);
  }

  if (!hasUser || hasUser.password !== password) {
    throw new httpError("User doesn't exist", 401);
  } else {
    res.json({ message: "logged in" });
  }
};

exports.getUsers = getUsers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;
