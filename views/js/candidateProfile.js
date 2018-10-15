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
});

jQuery('#reject').on('click', function () {
  jQuery.post('/statusChange', {
    club,
    rollNumber,
    candidateStatus: 'Rejected'
  }, function () {
    jQuery('#status')[0].textContent = 'Rejected';
  });
});

jQuery('#shortlist').on('click', function () {
  jQuery.post('/statuschange', {
    club,
    rollNumber,
    candidateStatus: 'Shortlisted'
  }, function () {
    jQuery('#status')[0].textContent = 'Shortlisted';
  });
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
})

/* Slider Code */
var step = 10;
var finalVal = 1;

// document.body.style.zoom = "250%"
$(".slider").each(function() {
    var self = $(this);
    var slider = self.slider({
        create: function() {
            self.find('.text strong').text(self.slider('value'));
            setPathData(self.find('.smiley').find('svg path'), self.slider('value'));
        },
        slide: function(event, ui) {
            self.find('.text strong').text(ui.value);
            setPathData(self.find('.smiley').find('svg path'), ui.value);
        },
        range: 'min',
        min: 1,
        max: step,
        value: 1,
        step: 1
    });
});

function setPathData(path, value) {
    var firstStep = 6 / step * value;
    var secondStep = 2 / step * value;
    finalVal = value;
    jQuery('#rating')[0].textContent = finalVal;
    path.attr('d', 'M1,' + (7 - firstStep) + ' C6.33333333,' + (2 + secondStep) + ' 11.6666667,' + (1 + firstStep) + ' 17,' + (1 + firstStep) + ' C22.3333333,' + (1 + firstStep) + ' 27.6666667,' + (2 + secondStep) + ' 33,' + (7 - firstStep));
}
