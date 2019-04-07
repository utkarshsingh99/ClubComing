function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}
var club = toTitleCase(jQuery('#club').text());
console.log(club);
var rollNumber = jQuery('#rollNumber').text();
var name = toTitleCase(jQuery('#name').text());
var email = jQuery('#email').text();
var colorLookup = {"select":"green","shortlist":"yellow","reject":"red"};
jQuery('#club-name').append('Club up for '+ club);
jQuery('title').append(name + "'s Profile")
jQuery('.feature-column').on('click', function () {
  var choice = jQuery(this);
  var status = toTitleCase(choice[0].id)+'ed';
  jQuery('.feature-column').css("border", "none");
  choice.css('border','2px ' + colorLookup[choice[0].id]+' solid');
  console.log(status);
  jQuery.post('/statusChange', {
    club,
    rollNumber,
    candidateStatus: status
  }, (d) => {
    console.log(`Success: ${d}`);
  });
});


jQuery('#undo').on('click', function () {
  jQuery.post('/statusChange', {
    club,
    rollNumber,
    candidateStatus: 'Interviewed'
  }, function () {
    jQuery('#status')[0].textContent = 'Interviewed';
  });
});

jQuery('#submitScore').on('click', function () {
  jQuery.post('/scorechange', {
    club,
    rollNumber,
    rating: jQuery('input[name="rating"]:checked').val(),
    comments: jQuery('#comments')[0].value
  }, function () {
    alert('Your Scores were recorded!');
  });
});

jQuery('#submitMail').on('click', function () {
  var feedbackName = jQuery('#feedbackName')[0].textContent;
  var feedbackEmail = jQuery('#feedbackEmail')[0].textContent;
  var feedback = "";
  feedback = jQuery('#feedback')[0].textContent;
  console.log(feedback);
  jQuery.post('/mail', {
    mail: email,
    club,
    feedback
  });
});

/* Interview data for different clubs */
jQuery.get('/fetchclubs', {rollNumber}, function (clubs) {
  var count = 1;
  var statusMessage;
    if(club.interviewStatus == 'Applied') {
      statusMessage =  `<b>hasn't interviewed</b> ${name} yet`;
    } else {
      statusMessage = `<b>has interviewed</b> ${name} and are reviewing their application`;
    }

  console.log('Real Info of Clubs: ', clubs);
  clubs.forEach(function (club) {
    var string =
    `
    <div class="row">
    <div class="left">
      <img src="https://assets-cdn.github.com/images/modules/logos_page/Octocat.png"  alt="" class='grid-img'/>
    </div>
    <div class="right content-mid">
      <h3>${club.club}</h3>
      <p>${club.club} ${statusMessage}</p>
    </div>
    </div>
    <div class="row"><hr></div>
    `;
    jQuery('#clubApplied').append(string);
  });
});
//Navbar Toggle
jQuery('#toggle').on('click',function(){
  if(jQuery('#nav-container').css('display')=='none'){
    jQuery('#nav-container').css('display','block');
  }
  else{
    jQuery('#nav-container').css('display','none');
  }
})
