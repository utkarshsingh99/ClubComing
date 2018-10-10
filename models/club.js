const mongoose = require('mongoose');
const validator = require('validator');

var ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true            // TODO: Please add minlength later
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

var Club = mongoose.model('Club', ClubSchema);

module.exports = {Club}
