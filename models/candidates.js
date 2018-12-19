const mongoose = require('mongoose');
const validator = require('validator');

var CandidateSchema = new mongoose.Schema({
    club: {
      type: String,
      required: true
    },
    candidateStatus: {
      type: String,
      default: 'Unresolved'          // 'Unresolved', 'Selected', 'Rejected', 'Shortlisted'
    },
    interviewStatus: {
      type: String,
      default: 'Applied'            // 'Applied' or 'Interviewed'
    },
    rating: {
      type: String
    },
    comments: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    mobile: {
      type: Number            // TODO:  Add Unique and Required key
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: `{VALUE} is not a valid email`
      }
    },
    branch: {
      type: String            // TODO:  Add Unique and Required key
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true
    },
    skills: {
      type: String
    },
    // skills: {
    //   type: String            // TODO: Add Array in Schema
    // },
    ques1: {
      type: String
    },
    ques2: {
      type: String
    },
    ques3: {
      type: String
    },
    ques4: {
      type: String
    },
    Achievements: {
      type: String
    },
    AreasOfInt: {
      type: String
    }
});

var Candidates = mongoose.model("Candidates", CandidateSchema);

module.exports = {Candidates};
