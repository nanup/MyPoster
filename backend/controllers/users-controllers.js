const uuid = require("uuid");

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

  const user = DUMMY_USERS.find((user) => user.email === email);

  if (!user || user.password !== password) {
    throw new httpError("User doesn't exist", 401);
  } else {
    res.json({ message: "logged in" });
  }
};

exports.getUsers = getUsers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;
