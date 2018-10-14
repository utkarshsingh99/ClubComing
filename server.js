const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')

var {Candidates} = require('./models/candidates');
var {Club} = require('./models/club');
var {authenticate} = require('./middleware/authenticate');
var {fetchClubInfo} = require('./middleware/fetchClubInfo');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ClubComing')

var app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(__dirname+'/views'));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/login', authenticate, (req, res) => {
    res.cookie('x-auth', req.token, { maxAge: 900000, httpOnly: true });
    res.render('dashboard', {
      clubName: req.user.name
    });
});

app.get('/dashboard', fetchClubInfo, (req, res) => {
  res.render('dashboard', {
    clubName: req.user
  });
});

app.get('/candidate', (req, res) => {             //  add fetchClubInfo middleware
  res.render('candidateProfile');
});

app.post('/postcandidate', (req, res) => {
  var body = _.pick(req.body, ["name", "rollNumber"]);
  var clubName = req.body.clubName.toLowerCase().replace(/\s/g, "");
  body.clubName = clubName;

  var candidates = new Candidates(body);
  candidates.save().then((cand) => {
    res.send(cand);
  }).catch((e) => {
    res.sendStatus(400).send(e);
  });
});

app.get('/testjsondata', (req, res) => {
  var body=[{
    name: "Utkarsh Singh",
    rollNum: "IIITU17101",
    rating: "",
    branch: "Computer Science and Engineering",
    status: "accepted"
  }, {
    name: "Tanuj Jagad",
    rollNum: "17mi559",
    rating: "10",
    branch: "Mechanical",
    status: "rejected"
  }];
  res.send(JSON.stringify(body));
});

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

app.listen('3000', () => {
  console.log(`Up`);
});

//LaTex TEMPLATING
function makepdf(club, id, res){
  var ref = firebase.database().ref();
  var base_filename = path.join(__dirname, '/generated_pdfs', club+id)
  var pdf_filename = base_filename+'.pdf';
  ref.on("value", (snapshot, e)=>{
    var fs = require('fs');
    var json_obj = snapshot.val()[club][id];
    json_obj['rollno'] = id;
    fs.writeFile(base_filename+'.json', JSON.stringify(json_obj), function(err) {});
    var prc = spawn('python', ["makepdf.py", base_filename+'.json']);

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
  });
}
