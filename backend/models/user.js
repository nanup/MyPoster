const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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

userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

userSchema.plugin(validator);

module.exports = mongoose.model('User', userSchema);
