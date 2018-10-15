const bodyParser = require('body-parser');

var {Club} = require('./../models/club');

var fetchClubInfo = (req, res, next) => {
  var token = req.cookies['x-auth'];
  var body = req.body;
  var query = req.query;
  Club.findByToken(token).then((club) => {
    if(!club) {
      return Promise.reject();
    }
    req.user = club;
    req.body = body;
    req.query = query;
    next();
  }).catch((e) => {
    console.log("error:",e);
    res.status(401).send();
  });
}

module.exports = {fetchClubInfo}
