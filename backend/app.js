const express = require("express");
const bodyParser = require("body-parser");

const httpError = require("./models/http-error");
const posterRoutes = require("./routes/poster-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/posters", posterRoutes);

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

app.listen(5000);
