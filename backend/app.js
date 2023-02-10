const express = require("express");
const bodyParser = require("body-parser");

const posterRoutes = require("./routes/poster-routes");

const app = express();

app.use("/api/posters", posterRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  } else {
    res.status(error.code || 500);
    res.json({ errorMessage: error.message || "Something went wrong!" });
  }
});

app.listen(5000);
