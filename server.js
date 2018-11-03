const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawn;
var argv = require('optimist').argv;

var {Candidates} = require('./models/candidates');
var {Club} = require('./models/club');
var {authenticate} = require('./middleware/authenticate');
var {fetchClubInfo} = require('./middleware/fetchClubInfo');

const port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://appteam:123456a@ds147213.mlab.com:47213/clubcoming', {useNewUrlParser: true, useCreateIndex: true})

var app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(__dirname+'/views'));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/signedout', (req, res) => {
  var token = req.cookies['x-auth'];
  Club.findByToken(token).then((club) => {
    if(!club) {
      return Promise.reject();
    }

    Club.findOneAndUpdate({
      '_id': club._id
    },
    {$pull: {
      tokens: {token}
    }}).then((club) => {
      return res.send(200);
    }).catch((e) => {
      console.log(`Error`);
      res.sendStatus(400);
    })
  })
});

app.post('/login', authenticate, (req, res) => {
    res.cookie('x-auth', req.token, { maxAge: 900000, httpOnly: true });
    res.render('dashboard', {
      clubName: req.user.name
    });
});

app.get('/dashboard', fetchClubInfo, (req, res) => {
  res.render('dashboard', {
    clubName: req.user.name
  });
});

app.get('/candidate/:clubname/:roll', fetchClubInfo, (req, res) => {
  var clubName = req.params.clubname;
  var roll = req.params.roll;
  var candidate;
  Candidates.findOne({
    club: clubName,
    rollNumber: roll
  }).then((cand) => {
    res.render('candidateProfile', cand);
  });
});

app.post('/postcandidate', (req, res) => {
  console.log(`Post Request being made`);
  var body = _.pick(req.body, ["name", "rollNumber", "mobile", "club", "branch", "email", "interviewStatus", "skills", "Achievements", "AreasOfInt", "ques1", "ques2", "ques3", "ques4"]);

  var candidates = new Candidates(body);
  console.log(body);
  candidates.save().then((cand) => {
    res.send(cand);
  }).catch((e) => {
    res.send(e);
  });
});

app.get('/fetchcandidates', fetchClubInfo, (req, res) => {
  Candidates.find({
    club: req.query.name
  }).then((candidates) => {
    res.send(candidates)
  }).catch((e) => {
    res.send(`Sorry, our servers are having a problem with making your request`);
  });
});

app.get('/fetchclubs', fetchClubInfo, (req, res) => {
  Candidates.find({
    rollNumber: req.query.rollNumber
  }).then((list) => {
    res.send(list);
  }).catch((e) => {
    res.send(`Sorry, our servers are having a problem with making your request`);
  });
})

app.post('/statusChange', fetchClubInfo, (req, res) => {
  //Query to update status Change
  Candidates.findOneAndUpdate({
    rollNumber: req.body.rollNumber,
    club: req.body.club
  },
  { $set: {candidateStatus: req.body.candidateStatus, interviewStatus: 'Interviewed'}},
  {new: true}).then((user) => {
    res.send(user);
  });
});

app.post('/scoreChange', fetchClubInfo, (req, res) => {
  Candidates.findOneAndUpdate({
    rollNumber: req.body.rollNumber,
    club: req.body.club
  },
  { $set: {rating: req.body.rating, comments: req.body.comments, interviewStatus: 'Interviewed'}},
  {new: true}).then((user) => {
    res.send(user);
  });
});

app.get('/pingcheck', (req, res) => {
  res.send(`Hello!`);
})

// LaTeX code by Kartikey
app.get('/api/getpdf/:club/:id', (req, res) => {
  var club = req.params.club;
  var id = req.params.id;
  var base_filename = path.join(__dirname, '/generated_pdfs', club+id)
  var pdf_filename = base_filename+'.pdf';
  fs.stat(pdf_filename, function(err, stat) {
    if(err == null) {
        console.log('File exists');
        res.sendFile(pdf_filename);
    } else if(err.code == 'ENOENT') {
        // file does not exist
        makepdf(club,id,res);
    } else {
        console.log('Some other error: ', err.code);
    }
  });
});

  // var ref = firebase.database().ref();
app.listen(port, () => {
  console.log(`Up`);
});

//LaTex TEMPLATINGlocalhost:3000/api/getpdf/:club/:id
function makepdf(club, id, res){
  var base_filename = path.join(__dirname, '/generated_pdfs', club+id)
  var pdf_filename = base_filename+'.pdf';
  console.log(`Inside makepdf`);
  Candidates.findOne({
    club,
    rollNumber: id
  }).then((candidate) => {
    var fs = require('fs');
    var json_obj = candidate;
    console.log(candidate);
    fs.writeFileSync(base_filename+'.json', JSON.stringify(json_obj), function(err) {});
    var prc = spawn('python3', ["makepdf.py", base_filename+'.json']);

    //noinspection JSUnresolvedFunction
    prc.stdout.setEncoding('utf8');
    prc.stdout.on('data', function (data) {
        var str = data.toString()
        var lines = str.split(/(\r?\n)/g);
        console.log(lines.join(""));
    });
    prc.stderr.setEncoding('utf8');
    prc.stderr.on('data', function (data) {
        var str = data.toString()
        var lines = str.split(/(\r?\n)/g);
        console.log(lines.join(""));
    });

    prc.on('close', function (code) {
        res.sendFile(pdf_filename);
        console.log('process exit code ' + code);
    });
  }).catch((err) => {
    console.log(`No Candidate Found`, err);
  });
}
