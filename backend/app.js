const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const httpError = require("./models/http-error");
const posterRoutes = require("./routes/poster-routes");
const userRoutes = require("./routes/user-routes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posters", posterRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new httpError("Route not found", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  } else {
    res.status(error.code || 500);
    res.json({ errorMessage: error.message || "Something went wrong!" });
  }
});

// Server
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mdhqaux.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((error) => console.log(error));
