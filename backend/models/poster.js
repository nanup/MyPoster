const mongoose = require("mongoose");

const posterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  trailerLink: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Poster", posterSchema);