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
    const query = await Poster.find({ userId: userId });
    posters = query.map((poster) => poster.toObject());
  } catch (err) {
    const error = new httpError(err.message, 404);
    return next(error);
  }

  if (posters.length === 0) {
    const error = new httpError(
      "Could not find posters from provided user ID",
      404
    );
    return next(error);
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

const patchPosterById = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new httpError("Invalid inputs", 422);
    return next(error);
  }

  const { title, image, year } = req.body;
  const id = req.params.pid;

  try {
    const poster = await Poster.findById(id);

    poster.title = title;
    poster.image = image;
    poster.year = year;

    await poster.save();
  } catch (err) {
    const error = new httpError(err.message, 404);
    return next(error);
  }

  res.status(200).json({ poster: { id, title, image, year } });
};

const deletePosterById = async (req, res, next) => {
  const id = req.params.pid;
  try {
    const poster = await Poster.findByIdAndDelete(id);
  } catch (err) {
    const error = new httpError(err.message, 404);
    return next(error);
  }
  res.status(200).json({ message: "Poster deleted." });
};

exports.getPosterById = getPosterById;
exports.getPostersByUserId = getPostersByUserId;
exports.postPoster = postPoster;
exports.patchPosterById = patchPosterById;
exports.deletePosterById = deletePosterById;
