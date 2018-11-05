$(document).ready(callServer);
var selected = [], rejected = [], shortlisted = [], all = [], interviewed = [], notInterviewed = [];
var clubData = {
  name: jQuery('#clubName')[0].text.toLowerCase()
}

console.log(clubData);
var candidatesData = jQuery('#candidates');
function renderHTML(candidate) {
  if(candidate.rating === "" || candidate.rating == undefined) {
    candidate.rating = "--";
  }
  var candidateStatus = "";
  if(candidate.candidateStatus === 'Selected') {
    candidateStatus = "https://uploads-ssl.webflow.com/5bdc847e1ca86e65658328d1/5bdc88137b8a5774d1e305bd_selected.png";
  } else if (candidate.candidateStatus === 'Rejected') {
    candidateStatus = "https://uploads-ssl.webflow.com/5bdc847e1ca86e65658328d1/5bdc88528b50477564bb2968_rejected.png";
  } else if(candidate.candidateStatus === 'Shortlisted') {
    candidateStatus = "https://uploads-ssl.webflow.com/5bdc847e1ca86e65658328d1/5bdc883e8be058c192ec6398_shortlisted.jpeg";
  } else {
    candidateStatus = "";
  }
  var string = `<tr onclick="location.href='http://clubcoming.herokuapp.com/candidate/${clubData.name}/${candidate.rollNumber}'">
    <td><img class="pic" src="https://images-na.ssl-images-amazon.com/images/I/71hpUMuoxpL._UX522_.jpg" alt=""></td>
   <td>${candidate.name}</td>
   <td>${candidate.rollNumber}</td>
   <td>${candidate.rating}</td>
   <td>${candidate.interviewStatus}</td>
   <td><img src="${candidateStatus}" width="35" alt="" class="grid-image" /></td>
   </tr>`
  return string;
}

function callServer() {
  jQuery.getJSON('/fetchcandidates', clubData, function(data) {
    data.forEach(function (candidate) {
      all.push(candidate);
      var string = renderHTML(candidate);
      jQuery('#display-all').append(string);
      if(candidate.interviewStatus === 'Interviewed') {
        interviewed.push(candidate);
      } else {
        notInterviewed.push(candidate);
      }
      console.log(interviewed.length);
      switch (candidate.candidateStatus) {
        case 'Selected': selected.push(candidate);
                         var string = renderHTML(candidate);
                         jQuery('#display-selected').append(string);
          break;
        case 'Rejected': rejected.push(candidate);
                         var string = renderHTML(candidate);
                         jQuery('#display-rejected').append(string);
          break;
        case 'Shortlisted': shortlisted.push(candidate);
                            var string = renderHTML(candidate);
                            jQuery('#display-shortlisted').append(string);
          break;
      }
    });
    jQuery('#interviewed').append(interviewed.length);
    jQuery('#remaining').append(notInterviewed.length);
    jQuery('#applications').append(interviewed.length + notInterviewed.length);
  });
}


jQuery('#signOut').on('click', function () {
  console.log(`Signing Out`);
  jQuery.get('/signedout', function () {
    console.log(`Changing Location`);
    window.location.pathname = '/';
  });
});

<!-- Visualisation Code -->

function branches(array) {
  var branch = [['CSE', 0], ['ECE', 0], ['CSE DUAL', 0], ['Mech.', 0], ['ECE DUAL', 0], ['Civil', 0]];
  array.forEach(function (candidate) {
    for(var i in branch) {
      candidate.branch = candidate.branch.toUpperCase();
      if(candidate.branch === branch[i][0]) {
        branch[i][1]++;
        break;
      }
    }
  });
  return branch;
}

function sex(array) {
  var sex = [['Male', 0], ['Female', 0], ['Not Specified', 0]];
  array.forEach(function (candidate) {
      if(candidate.sex === 'undefined') {
        sex[2][1]++;
      }else if(candidate.sex === 'Female') {
        sex[1][1]++;
      } else {
        sex[0][1]++;
      }
  });
  return sex;
}

function Stats (array, string, arg) {
  console.log(`In stats: ${arg}`);
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', string);
        data.addColumn('number', 'Number of Students');
        var arrayToPass = [];
        if(string == 'Branch') {
          arrayToPass = branches(array);
        } else {
          arrayToPass = sex(array);
        }
        data.addRows(arrayToPass);

        // Set chart options
        var options = {'title':`All Candidates by ${string}`,
                       'width':600,
                       'height':500};

        // Instantiate and draw our chart, passing in some options.
        string = string.toLowerCase();
        console.log(`${string}Chart${arg}`);
        var chart = new google.visualization.PieChart(document.getElementById(`${string}Chart${arg}`));
        chart.draw(data, options);
      }
}

console.log(all);

jQuery('#openStats').on('click', function () {
  jQuery('#candidates').css('display', 'none');
  jQuery('#stats').css('display', 'block');
  Stats(all, 'Branch', 'a');
  Stats(all, 'Sex', 'a');
  Stats(selected, 'Branch', 's');
  Stats(selected, 'Sex', 's');
  Stats(shortlisted, 'Branch', 'h');
  Stats(shortlisted, 'Sex', 'h');
  Stats(rejected, 'Branch', 'r');
  Stats(rejected, 'Sex', 'r');
});

jQuery('#openCandidates').on('click', function () {
  jQuery('#candidates').css('display', 'block');
  jQuery('#stats').css('display', 'none');
});
