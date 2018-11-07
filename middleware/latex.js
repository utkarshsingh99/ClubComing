const path = require('path');
const spawn = require('child_process').spawn;

var {Candidates} = require('./../models/candidates');

//LaTex TEMPLATINGlocalhost:3000/api/getpdf/:club/:id
var makepdf = (club, id, res) => {
  var base_filename = path.join(__dirname, '/generated_pdfs', club+id)
  var pdf_filename = base_filename+'.pdf';
  console.log(`Inside makepdf`);
  Candidates.findOne({
    club,
    rollNumber: id
  }).then((candidate) => {
    var fs = require('fs');
    var json_obj = candidate;
    var trimkeys = ['skills', 'Achievements', 'AreasOfInt', 'ques1', 'ques2', 'ques3', 'ques4'];
    for(var i in trimkeys) {
      json_obj[trimkeys[i]] = json_obj[trimkeys[i]].trim();
    }
    console.log(`Candidate found: ${json_obj}`);
    fs.writeFileSync(base_filename+'.json', JSON.stringify(json_obj), function(err) {});
    var prc = spawn('python3', ["middleware/makepdf.py", base_filename+'.json']);

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
};

module.exports = {makepdf};
