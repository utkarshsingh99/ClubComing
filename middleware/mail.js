const nodemailer = require('nodemailer');

const {serverInfo} = require('./serverInfo');

var sendMail = (mail, club, feedback) => {

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: serverInfo
    });

    var mailOptions = {
      from: 'clubupserver@gmail.com',
      to: mail,
      subject: `Feedback from ${club}`,
      text: `Hey,
      We hope you had a great time in the interviews with ${club}. It seems they have some honest feedback to give you.
      We hope you benefit from this and better yourself for your future. Here's the feedback:
      ${feedback}`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        return Promise.reject();
      } else {
        console.log('Email sent: ' + info.response);
        return Promise.resolve(info.response);
      }
    });
}

module.exports = {sendMail};
