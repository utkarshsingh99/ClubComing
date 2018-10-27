$(document).ready(callServer);
callServer();
var selected = [], rejected = [], shortlisted = [], all = [];
var clubData = {
  name: jQuery('#clubName')[0].text
}

var candidatesData = jQuery('#candidates');
function renderHTML(candidate) {
  if(candidate.rating === "") {
    candidate.rating = "--";
  }
  var string = `<a href="/candidate/${clubData.name}/${candidate.rollNumber}"><div class="row cand-box">
    <div class="col-md-6">
      <h3>${candidate.name}</h3>
      <h4>${candidate.rollNumber}</h4>
    </div>
    <div class="col-md-6" style="text-align: right">
      <h3>${candidate.rating}</h3>
      <h4>${candidate.interviewStatus}</h4>
    </div>
  </div></a>`
  candidatesData.append(string);
}

console.log(clubData);

function callServer() {
  jQuery.getJSON('/fetchcandidates', clubData, function(data) {
    data.forEach(function (candidate) {
      all.push(candidate);
      renderHTML(candidate);
      console.log(candidate.candidateStatus);
      switch (candidate.candidateStatus) {
        case 'Selected': selected.push(candidate);
          break;
        case 'Rejected': rejected.push(candidate);
          break;
        case 'Shortlisted': shortlisted.push(candidate);
          break;
      }
    });
  });
}

jQuery('#selected').on('click', function () {
  candidatesData.html("");
  selected.forEach(function (selectedCand) {
    renderHTML(selectedCand);
  });
});

jQuery('#rejected').on('click', function () {
  candidatesData.html("");
  rejected.forEach(function (selectedCand) {
    renderHTML(selectedCand);
  });
});

jQuery('#shortlisted').on('click', function () {
  candidatesData.html("");
  shortlisted.forEach(function (selectedCand) {
    renderHTML(selectedCand);
  });
});

jQuery('#all').on('click', function () {
  candidatesData.html("");
  all.forEach(function (selectedCand) {
    renderHTML(selectedCand);
  });
});

jQuery('#signOut').on('click', function () {
  console.log(`Signing Out`);
  jQuery.get('/signedout', function () {
    console.log(`Changing Location`);
    window.location.pathname = '/';
  });
});
