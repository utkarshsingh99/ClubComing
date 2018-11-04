const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'clubupserver@gmail.com',
    pass: 'appteam@123'
  }
});

var mailOptions = {
  from: 'clubupserver@gmail.com',
  to: 'utkarshsingh369@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
