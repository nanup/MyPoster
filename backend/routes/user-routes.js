const express = require("express");

const usersControllers = require("../controllers/users-controllers");

const userRouter = express.Router();

userRouter.get("/", usersControllers.getUsers);

userRouter.post("/signup", usersControllers.signupUser);

userRouter.post("/login", usersControllers.loginUser);

module.exports = userRouter;
