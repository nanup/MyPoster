const express = require("express");
const { check } = require("express-validator");

const postersControllers = require("../controllers/poster-controllers");

const posterRouter = express.Router();

posterRouter.get("/:pid", postersControllers.getPosterById);

posterRouter.get("/user/:uid", postersControllers.getPostersByUserId);

posterRouter.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("year").isLength({ min: 4, max: 4 }),
    check("image").not().isEmpty(),
  ],
  postersControllers.postPoster
);

posterRouter.patch(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("year").isLength({ min: 4, max: 4 }),
    check("image").not().isEmpty(),
  ],
  postersControllers.patchPosterById
);

posterRouter.delete("/:pid", postersControllers.deletePosterById);

module.exports = posterRouter;
