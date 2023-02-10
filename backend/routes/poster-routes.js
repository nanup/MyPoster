const express = require("express");

const postersControllers = require("../controllers/poster-controllers");

const posterRouter = express.Router();

posterRouter.get("/:pid", postersControllers.getPosterById);

posterRouter.get("/user/:uid", postersControllers.getPostersByUserId);

posterRouter.post("/", postersControllers.postPoster);

posterRouter.patch("/:pid", postersControllers.patchPosterById);

posterRouter.delete("/:pid", postersControllers.deletePosterById);

module.exports = posterRouter;