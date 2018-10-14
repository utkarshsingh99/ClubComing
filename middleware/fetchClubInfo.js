const bodyParser = require('body-parser');

var {Club} = require('./../models/club');

var fetchClubInfo = (req, res, next) => {
  var token = req.cookies;
  var body = req.body;
  console.log(body);
  Club.findByToken(token).then((club) => {
    if(!club) {
      return Promise.reject();
    }
    console.log(body);
    req.user = club;
    req.body = body;
    next();
  }).catch((e) => {
    console.log(e);
    res.status(401).send();
  });
}

module.exports = {fetchClubInfo}
