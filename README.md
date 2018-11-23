# ClubComing

ClubComing is a website that partly automates the interview process for getting into clubs in various colleges.

We have an app which will be used by candidates to register for interviews. This consists of form answers to common CV questions. You can find the working demo here: https://github.com/appteam-nith/GetIntoClub

CVs of a particular candidate for a particular club is uploaded to the common Database connected with the hosted server. 
The website seeks to display this uploaded data in front of interviewers making management of so many CVs and applications easier.

### How to Run
1. Clone the repo
2. In Command Line under this repo,
> npm install
3. Run Node
> node server.js
4. In your browser, type the following URL:
> localhost:3000

If you want to just check if the server is running, type this in the browser:
> localhost:3000/pingcheck
##### Expected Output
```
Hello!
```

### Need
The bigger the college, the more number of clubs it houses, and more are the number of applications for each one of them. While interviewing such a large pool of students, often some amazing applications are left out. With better visualization and management, the club members can focus on just choosing the applicant all the while having more information than they could ever imagine!

### Website vs Paper
- All the applications in front of you at once. For each candidate, you have the luxury of Selecting, Rejecting or Shortlisting, and anyone from your club can view the CVs and discuss their judgements.  
- Statistical Analysis of applications, your selections and rejections was never so easier.
- Want to know if some other club is also interviewing the applicant? Candidate's status is displayed right on his profile.
- No one likes being rejected. Send a direct feedback to the candidate you're unable to select for some reason. The feedback will go directly to his/her mail.

The site is hosted on http://clubcoming.herokuapp.com/

Contributions, Suggestions and Feedback are welcome!
