const express = require("express");

const httpError = require("../models/http-error");

const router = express.Router();

const DUMMY_POSTERS = [
  {
    id: "p1",
    title: "In the Mood for Love",
    description: "Wong Kar Wai's colorful masterpiece",
    image: "https://i.redd.it/c03fqf6peuca1.jpg",
    year: 2000,
    trailerLink: "https://www.youtube.com/embed/m8GuedsQnWQ",
    userid: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const id = req.params.pid;
  const poster = DUMMY_POSTERS.find((poster) => {
    return poster.id === id;
  });

  if (!poster) {
    throw new HttpError("Could not find provided ID", 404);
  }

  res.json(poster);
});

router.get("/user/:uid", (req, res, next) => {
  const userid = req.params.uid;
  let posters = [];
  for (let poster of DUMMY_POSTERS) {
    if (poster.userid === userid) {
      posters.push(poster);
    }
  }

  if (posters.length === 0) {
    throw new httpError("Could not find provided ID", 404);
  }

  res.json({ posters });
});

module.exports = router;
