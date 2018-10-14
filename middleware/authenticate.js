const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var {Club} = require('./../models/club');
var {app} = require('./../server');

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
    var name = req.body.name;
    var password = req.body.password;
    console.log(name);
  Club.findOne({name}).then((user) => {
    console.log(`Found User: ${user}`);
    var verifyPass = bcrypt.compare(password, user.password, (err, res) => {
      console.log(`Inside password checking: ${res}`);
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
    res.sendStatus(401);
  });
};

module.exports = {authenticate};
