const uuid = require("uuid");
const { validationResult } = require("express-validator");

const httpError = require("../models/http-error");
const Poster = require("../models/poster");

let DUMMY_POSTERS = [
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

const getPosterById = async (req, res, next) => {
  const id = req.params.pid;

  let poster;
  try {
    poster = await Poster.findById(id);
  } catch (err) {
    const error = new httpError(err.message, 404);
    return next(error);
  }

  if (!poster) {
    throw new httpError("Poster not found", 404);
  }

  res.json({ poster: poster.toObject({ getters: true }) });
};

const getPostersByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let posters = [];
  try {
    const query = await Poster.find({ userid: userId });
    posters = query.map((poster) => poster.toObject({ getters: true }));
  } catch (err) {
    const error = new httpError(err.message, 404);
    return next(error);
  }

  if (posters.length === 0) {
    throw new httpError("Could not find posters from provided user ID", 404);
  }

  res.json({ posters });
};

const postPoster = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new httpError("Invalid inputs", 422);
  }

  const { userId, title, description, year, trailerLink, image } = req.body;

  const newPoster = new Poster({
    userId,
    title,
    description,
    year,
    trailerLink,
    image,
  });

  try {
    await newPoster.save();
  } catch (err) {
    throw new httpError(err.message, 500);
  }

  res.status(201).json({ poster: newPoster });
};

const patchPosterById = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new httpError("Invalid inputs", 422);
  }

  const { title, image, year } = req.body;
  const id = req.params.pid;

  const updatedPoster = { ...DUMMY_POSTERS.find((poster) => poster.id === id) };
  const posterIndex = DUMMY_POSTERS.findIndex((poster) => poster.id === id);
  updatedPoster.title = title;
  updatedPoster.year = year;
  updatedPoster.image = image;

  DUMMY_POSTERS[posterIndex] = updatedPoster;

  res.status(200).json({ poster: updatedPoster });
};

const deletePosterById = (req, res, next) => {
  const id = req.params.pid;
  DUMMY_POSTERS = DUMMY_POSTERS.filter((poster) => poster.id !== id);
  res.status(200).json({ message: "Poster deleted." });
};

exports.getPosterById = getPosterById;
exports.getPostersByUserId = getPostersByUserId;
exports.postPoster = postPoster;
exports.patchPosterById = patchPosterById;
exports.deletePosterById = deletePosterById;
