const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var _ = require('lodash');

var {Candidate} = require('./models/candidates');
var {Club} = require('./models/club');

mongoose.Promise = global.Promise;

var app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(__dirname+'/views'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard',{
    username: req.body.name
  })
});

app.post('/postcandidate', (req, res) => {
  var newCandidate = _.pick(req.body, ["name", "rollNumber"]);
  var candidate = new Candidate(newCandidate);

  var clubName = req.body.clubName.replace(/\s/g, "").toLowerCase();
  console.log(clubName);
  var mongoURL = `mongodb://localhost:27017/${clubName}`;
  mongoose.connect(mongoURL);

  candidate.save().then((candidate) => {
    res.send(candidate);
  }).catch((e) => {
    res.sendStatus(400).send(e);
  });
});

app.post('/postthis', (req, res) => {
  if(req.body.name === '1' && req.body.password === '1') {
    res.render('dashboard', {
      username: req.body.name
    })
  } else {
    res.sendStatus(`Wrong Password or Username`);
  }
});

app.listen('3000', () => {
  console.log(`Up`);
});
