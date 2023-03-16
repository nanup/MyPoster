const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const httpError = require("../models/http-error");

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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new httpError("Signup failed, please try again later", 500);
    return next(error);
  }

  const newUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    posters: [],
  });
  try {
    await newUser.save();
  } catch (err) {
    return next(new httpError(err.message, 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      "dontsharethis",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new httpError("Signup failed, please try again later", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: newUser.id, email: newUser.email, token: token });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const hasUser = await User.findOne({ email });

  if (!hasUser) {
    return next(new httpError("User credentials are wrong", 401));
  } else {
    let isValidPassword = false;
    isValidPassword = await bcrypt.compare(password, hasUser.password);
    if (!isValidPassword) {
      return next(new httpError("User credentials are wrong", 401));
    } else {
      let token;
      try {
        token = jwt.sign(
          { userId: hasUser.id, email: hasUser.email },
          "dontsharethis",
          { expiresIn: "1h" }
        );
      } catch (err) {
        const error = new httpError(
          "Logging in failed, please try again later",
          500
        );
        return next(error);
      }

      console.log(hasUser);

      res.json({ userId: hasUser._id, email: hasUser.email, token: token });
    }
  }
};

exports.getUsers = getUsers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;
