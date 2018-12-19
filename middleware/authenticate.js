const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

var {Club} = require('./../models/club');

var generateAuthToken = (user) => {
  var user = user;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat({access, token});

  Club.update(
    {name: user.name},
    {$addToSet: {tokens: {access, token}}}).then((club) => {
    console.log(club);
  });
  return token;
};

var authenticate = (req, res, next) => {
  var user1 = {
    name: req.body.name,
    password: req.body.password
  };
  Club.findOne({name: user1.name}).then((user) => {
  var verifyPass = bcrypt.compare(user1.password, user.password, (err, res) => {
    var token = generateAuthToken(user);
    if(res) {
      req.token = token;
      req.user = user;
      next();
     } else {
       return Promise.reject();
    }
  });
}).catch((e) => {
  console.log(`Authenticate middleware Error: ${e}`);
  res.sendStatus(401);
});
};

module.exports = {authenticate};
