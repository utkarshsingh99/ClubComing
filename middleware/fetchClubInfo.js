const bodyParser = require('body-parser');

var {Club} = require('./../models/club');

var fetchClubInfo = (req, res, next) => {
  var token = req.cookies;
  console.log(token);
  Club.findByToken(token).then((club) => {
    if(!club) {
      return Promise.reject();
    }

    req.user = club;
    next();
  }).catch((e) => {
    console.log(e);
    res.status(401).send();
  });
}

module.exports = {fetchClubInfo}
