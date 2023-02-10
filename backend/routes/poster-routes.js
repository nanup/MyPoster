const express = require("express");

const postersControllers = require("../controllers/poster-controllers");

const router = express.Router();

router.get("/:pid", postersControllers.getPosterById);

router.get("/user/:uid", postersControllers.getPostersByUserId);

router.post("/", postersControllers.postPoster);

router.patch("/:pid", postersControllers.patchPosterById);

router.delete("/:pid", postersControllers.deletePosterById);

module.exports = router;
