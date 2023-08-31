const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  posters: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Poster',
    },
  ],
});

userSchema.plugin(validator);

module.exports = mongoose.model('User', userSchema);
