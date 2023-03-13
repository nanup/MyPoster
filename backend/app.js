const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const httpError = require("./models/http-error");
const posterRoutes = require("./routes/poster-routes");
const userRoutes = require("./routes/user-routes");

const app = express();

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

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
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  } else {
    res.status(error.code || 500);
    res.json({ errorMessage: error.message || "Something went wrong!" });
  }
});

mongoose
  .connect(
    "mongodb+srv://nanup:fzW8KQfga1OkRd80@cluster0.mdhqaux.mongodb.net/MyPoster?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => console.log(error));
