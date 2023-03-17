const httpError = require("../models/http-error");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    } else {
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
      req.userData = { userId: decodedToken.userId };
      next();
    }
  } catch (err) {
    const error = new httpError("Authentication failed", 401);
    return next(error);
  }
};
