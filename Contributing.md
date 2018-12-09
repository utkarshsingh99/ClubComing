## Guidelines For Contribution

Hope you've got a gist of the project after reading the README.md
Once you've understood the idea, start reading the issues and try solving them.

If you have any questions regarding anything in this repository, please don't hesitate in asking on our local gitter channel:

https://gitter.im/ClubComing/clubcoming

It's a community lobby where other people who have contributed to this idea will also be able to guide you.

## Beginner Tips
- Clone the program and follow the 'How to Run' steps in the README file.
- You do **NOT** need to study the entire code to start contributing.

## Usability
- Username: appteam
- Password: 12345

Use this for debugging and accessing further pages

## Issue Making

- Any form of bug, code error, feature enhancements, UI Changes request, or any other form of issue can be put up by anyone. 
- Once you make an issue, please wait for the Project Owner's 'go-ahead' remark to start working on that idea if you 
yourself want to resolve your issue. 
- Follow this Template:

```
**Issue-Type**: Bug/Code Error/Feature Enhancements/UI Changes
**Issue**: /* Your Issue Here */
**Assign To**: Me/Anyone
```

## Issue Resolving

- If you want to resolve an issue that is currently not assigned to anyone, please ask for permission to do that. 
This is because more than one person can submit the code for the same issue, and we certainly don't want anyone's hard work to go unrecognized.
- No specific template is needed for this. Just simply say that you can do this, and want to. :)

## Making Pull Requests

- After you fork the project,and push your changes to your forked repository, you will see an option to make a pull request above your file list.
- Click on that, and in the next page, you will have an option to comment something before making the PR.
- In the comments section, write the following for your PR
  1. Reference the Issue Number for which you're making the Pull Request in your comments.
  2. Mention your changes in a concise way if possible. 
    - If the change is in the UI Design, try uploading a screenshot of the changed UI page
    - If the change is for resolving a bug/optimisation, point out your optimisation for it.
    - If the change is for feature enhancements, just point out the files changed.
    
## Note for GET/POST Requests
(This is ONLY for those contributors who want to deal with GET/POST requests and Database Queries)

Since a lot of people might be sending test POST requests, we might have to occasionally clear the test data in our database. So if you do not GET any data which you had sent before, don't be worried

## Note for MongoDB Debugging
(This is ONLY for those contributors who want to deal with Database Queries and MongoDB Code)

If you want to access the database in your own PC, please do so by changing the URL in mongo.connect("") in server.js file. Due to security reasons we cannot provide actual database access to everyone. You are free to run the code in your PC by typing the following code:
```
mongo.connect("mongodb://localhost:27017/clubcoming", {useNewUrlParser: true, useCreateIndex: true});
```

While making a pull request at the end, make sure you change the URL back to the original one.
  
## Footnote

Contributing to Open Source is not that hard. Just be patient, empty your mind, and code your heart out!

If you have any problems and can't discuss it openly on our gitter channel, you can send a mail to me at 
clubupserver@gmail.com


  
