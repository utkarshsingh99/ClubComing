var club = jQuery('#club')[0].textContent;
var rollNumber = jQuery('#rollNumber')[0].textContent;

jQuery('#select').on('click', function () {
  jQuery.post('/statusChange', {
    club,
    rollNumber,
    candidateStatus: 'Selected'
  }, function () {
    jQuery('#status')[0].textContent = 'Selected';
  });
  window.href = '/dashboard';
});

jQuery('#reject').on('click', function () {
  jQuery.post('/statusChange', {
    club,
    rollNumber,
    candidateStatus: 'Rejected'
  }, function () {
    jQuery('#status')[0].textContent = 'Rejected';
  });
  window.href = '/dashboard';
});

jQuery('#shortlist').on('click', function () {
  jQuery.post('/statuschange', {
    club,
    rollNumber,
    candidateStatus: 'Shortlisted'
  }, function () {
    jQuery('#status')[0].textContent = 'Shortlisted';
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
    rating: jQuery('#rating')[0].textContent,
    comments: jQuery('#comments')[0].value
  }, function () {
    alert('Your Scores were recorded!');
  });
});

/* Interview data for different clubs */
jQuery.get('/fetchclubs', {rollNumber}, function (clubs) {

  clubs.forEach(function (club) {
    var string = `<tr>
      <td>${club.club}</td>
      <td style="text-align: right;">${club.candidateStatus}</td>
    </tr>`;
    jQuery('#table').append(string);
  });
});
