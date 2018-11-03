var club = jQuery('#club')[0].textContent;
var rollNumber = jQuery('#rollNumber')[0].textContent;
var name = jQuery('#name')[0].textContent;

jQuery('#select').on('click', function () {
  jQuery.post('/statusChange', {
    club,
    rollNumber,
    candidateStatus: 'Selected'
  }, function () {
    jQuery('#select').css("border", "2px green solid");
    jQuery('#shortlist').css("border", "none");
    jQuery('#reject').css("border", "none");
  });
  window.href = '/dashboard';
});

jQuery('#reject').on('click', function () {
  jQuery.post('/statusChange', {
    club,
    rollNumber,
    candidateStatus: 'Rejected'
  }, function () {
    jQuery('#select').css("border", "none");
    jQuery('#shortlist').css("border", "none");
    jQuery('#reject').css("border", "2px red solid");
  });
  window.href = '/dashboard';
});

jQuery('#shortlist').on('click', function () {
  jQuery.post('/statuschange', {
    club,
    rollNumber,
    candidateStatus: 'Shortlisted'
  }, function () {
    jQuery('#select').css("border", "none");
    jQuery('#reject').css("border", "none");
    jQuery('#shortlist').css("border", "2px yellow solid");
  });
  window.href = '/dashboard';
});

jQuery('#undo').on('click', function () {
  jQuery.post('/statuschange', {
    club,
    rollNumber,
    candidateStatus: 'Interviewed'
  }, function () {
    jQuery('#status')[0].textContent = 'Interviewed';
  });
});

jQuery('#submitScore').on('click', function () {
  console.log(`Click`);
  jQuery.post('/scorechange', {
    club,
    rollNumber,
    rating: jQuery('input[name="rating"]:checked').val(),
    comments: jQuery('#comments')[0].value
  }, function () {
    alert('Your Scores were recorded!');
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

  console.log('Clubs: ', clubs);
  clubs.forEach(function (club) {
    count++;
    if(count == 2) {
      count = 0;
      var rowString = `</div>
      <div class="w-row">`;
      jQuery('#clubApplied').append(rowString);
    }
    var string = `<div class="w-col w-col-6">
        <div class="w-row">
            <div class="w-col w-col-4"><img src="https://uploads-ssl.webflow.com/img/image-placeholder.svg" width="100" alt="" class="grid-image" /></div>
            <div class="w-col w-col-8">
                <h3>${club.club}</h3>
                <p>${club.club} ${statusMessage}</p>
            </div>
        </div>
    </div>`;
    jQuery('#clubApplied').append(string);
  });
});
