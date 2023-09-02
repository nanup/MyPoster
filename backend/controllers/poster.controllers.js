const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const NotFoundError = require('../errors/notFound.error');

const Poster = require('../models/poster.model');
const User = require('../models/user.model');

const getPosterByPosterId = async (req, res, next) => {
  const posterId = req.params.posterId;

  const poster = await Poster.findById(posterId);

  if (!poster) {
    return next(new NotFoundError('Poster not found!'));
  }

  return res.json({ poster: poster.toObject({ getters: true }) });
};

const getPostersByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let posters = [];
  const query = await Poster.find({ userId: userId });
  posters = query.map((poster) => poster.toObject());

  res.json({ posters });
};

const postPoster = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(Error('Bad request', 400));
  }

  const { userId, title, description, year, trailerUrl, imageUrl } = req.body;

  const newPoster = new Poster({
    userId,
    title,
    description,
    year,
    trailerUrl,
    imageUrl,
  });

  const user = await User.findById(userId);
  if (!user) {
    return next(new NotFoundError("User doesn't exist!"));
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  await newPoster.save({ session });
  user.posters.push(newPoster);
  await user.save({ session });

  await session.commitTransaction();

  res.status(201).json({ poster: newPoster });
};

const patchPosterById = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new Error('Bad request', 400));
  }

  const { title, imageUrl, year, trailerUrl } = req.body;
  const posterId = req.params.posterId;

  const poster = await Poster.findById(posterId);

  poster.title = title;
  poster.imageUrl = imageUrl;
  poster.year = year;
  poster.trailerUrl = trailerUrl;

  await poster.save();

  res.status(200).json({ poster: { title, imageUrl, year, trailerUrl } });
};

const deletePosterById = async (req, res, next) => {
  const posterId = req.params.posterId;

  const poster = await Poster.findByIdAndDelete(posterId).populate('userId');

  if (!poster) {
    return next(new NotFoundError('Poster not found!'));
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  await poster.remove({ session });
  poster.userId.posters.pull(poster);
  await poster.userId.save({ session });

  await session.commitTransaction();

  res.status(200).json({ message: 'Poster deleted' });
};

exports.getPosterByPosterId = getPosterByPosterId;
exports.getPostersByUserId = getPostersByUserId;
exports.postPoster = postPoster;
exports.patchPosterById = patchPosterById;
exports.deletePosterById = deletePosterById;
