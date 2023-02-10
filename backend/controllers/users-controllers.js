const uuid = require("uuid");
const { validationResult } = require("express-validator");

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

const signupUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new httpError("Invalid inputs", 422);
  }

  const { name, email, password } = req.body;
  const newUser = {
    id: uuid.v4(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(newUser);
  res.status(201).json({ user: newUser });
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
