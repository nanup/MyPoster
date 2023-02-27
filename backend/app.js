const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const httpError = require("./models/http-error");
const posterRoutes = require("./routes/poster-routes");
const userRoutes = require("./routes/user-routes");

const app = express();

app.use(bodyParser.json());

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

mongoose
  .connect(
    "mongodb+srv://nanup:1chBuDhXe7f0bohm@cluster0.mdhqaux.mongodb.net/MyPoster?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => console.log(error));
