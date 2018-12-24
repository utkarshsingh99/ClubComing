$(document).ready(callServer);
var selected = [], rejected = [], shortlisted = [], all = [], interviewed = [], notInterviewed = [];
var clubData = {
  name: jQuery('#clubName').text().toLowerCase()
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
  var string = `<a class="row-link removeable" href='/candidate/${clubData.name}/${candidate.rollNumber}'">
   <div class="Rtable-cell removeable"><img class="pic removeable" src="https://assets-cdn.github.com/images/modules/logos_page/Octocat.png" alt=""></div>
   <div class="Rtable-cell removeable">${candidate.name}</div>
   <div class="Rtable-cell removeable">${candidate.rollNumber}</div>
   <div class="Rtable-cell removeable">${candidate.rating}</div>
   <div class="Rtable-cell removeable">${candidate.interviewStatus}</div>
   <div class="Rtable-cell removeable"><img src="${candidateStatus}" width="35" alt="" class="grid-image removeable" /></div>
   </a>`
  return string;
}

function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
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

//  <!--Visualisation Code-->

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
        var options = {'title':`${toTitleCase(arg)} Candidates by ${string}`,
                       'width':'auto',
                       'height':'auto'};

        // Instantiate and draw our chart, passing in some options.
        string = string.toLowerCase();
        console.log(`${string}Chart${arg}`);
        var chart = new google.visualization.PieChart(document.getElementById(`${string}Chart`));
        chart.draw(data, options);
      }
}

console.log(all);

jQuery('#openStats').on('click', function () {
  jQuery('.feature').css('display', 'none');
  jQuery('.Rtable').css('display','none');
  jQuery('.nav-pills').addClass('stat-pills');
  jQuery('#stats').css('display', 'flex').removeClass('hide');
  Stats(all, 'Branch', 'all');
  Stats(all, 'Sex', 'all');
});

jQuery('.nav-pills').on('click',function(){
  if(jQuery(this).hasClass('stat-pills')){
    var selector = jQuery(this).attr('id');
    jQuery('.chart').children().remove();
    Stats(window[selector],'Branch',selector);
    Stats(window[selector],'Sex',selector);
  }
})

jQuery('#openCandidates').on('click', function () {
  jQuery('nav-pills').removeClass('stat-pills');
  jQuery('.feature').css('display', 'flex');
  jQuery('.Rtable').css('display','flex');
  jQuery('#stats').css('display', 'none');
});

console.log(selected);
jQuery(".nav-pills").on('click',function(){
  jQuery.each(jQuery('.nav-pills'),function(){
    jQuery(this).removeClass("active");
  });
  jQuery(this).addClass("active");
  var selector = jQuery(this).attr('id');
  jQuery(".removeable").detach();
  jQuery('.Rtable').attr('id','selected')
  var str = '';
  jQuery.each(window[selector],function(){
   str = str + renderHTML(this);
  });
  jQuery('.Rtable').append(str);
  
});

jQuery('#toggle').on('click',function(){
  if(jQuery('#nav-container').css('display')=='none'){
    jQuery('#nav-container').css('display','block');
  }
  else{
    jQuery('#nav-container').css('display','none');
  }
})
jQuery(window).resize(function(){
  if(jQuery('#toggle').css('display')=='none'){
    jQuery('#nav-container').css('display','flex');
  }
});