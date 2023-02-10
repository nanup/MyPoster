const uuid = require("uuid");

const httpError = require("../models/http-error");

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

const getPosterById = (req, res, next) => {
  const id = req.params.pid;
  const poster = DUMMY_POSTERS.find((poster) => {
    return poster.id === id;
  });

  if (!poster) {
    throw new httpError("Could not find provided ID", 404);
  }

  res.json(poster);
};

const getPostersByUserId = (req, res, next) => {
  const userid = req.params.uid;
  let posters = [];
  for (let poster of DUMMY_POSTERS) {
    if (poster.userid === userid) {
      posters.push(poster);
    }
  }

  if (posters.length === 0) {
    throw new httpError("Could not find provided user ID", 404);
  }

  res.json({ posters });
};

const postPoster = (req, res, next) => {
  const { userid, title, description, year, trailerLink, image } = req.body;

  const newPoster = {
    title: title,
    description: description,
    year: parseInt(year, 10),
    trailerLink: trailerLink,
    image: image,
    id: uuid.v4(),
    userid: userid,
  };

  DUMMY_POSTERS.push(newPoster);

  res.status(201).json({ poster: newPoster });
};

const patchPosterById = (req, res, next) => {
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

const deletePosterById = (req, res, next) => {};

exports.getPosterById = getPosterById;
exports.getPostersByUserId = getPostersByUserId;
exports.postPoster = postPoster;
exports.patchPosterById = patchPosterById;
exports.deletePosterById = deletePosterById;
