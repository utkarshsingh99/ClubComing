$(document).ready(callServer);

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
      <h4>${candidate.branch}</h4>
    </div>
  </div></a>`
  candidatesData.append(string);
}

console.log(clubData);

function callServer() {
  jQuery.getJSON('/testjsondata', clubData, function(data) {
    data.forEach(function (candidate) {
      all.push(candidate);
      renderHTML(candidate);
      switch (candidate.status) {
        case 'accepted': selected.push(candidate);
          break;
        case 'rejected': rejected.push(candidate);
          break;
        case 'shortlisted': shortlisted.push(candidate);
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
