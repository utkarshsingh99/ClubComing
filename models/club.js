const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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

ClubSchema.statics.findByToken =  function (token) {
  var Clubs = this;
  var decoded;
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch(e) {
    return Promise.reject();
  };
  return Clubs.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

var Club = mongoose.model('Club', ClubSchema);

module.exports = {Club}
