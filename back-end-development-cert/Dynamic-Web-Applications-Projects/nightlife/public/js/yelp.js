const TIME_SHIFT = 6;
const VENUES_PER_PAGE = 10;


$( document ).ready(function() {

  var $venueList = $('#venue-list');
  var $pageDisplayBox = $('#page-display-box');
  $('.pagination-down-btn').css({ opacity: 0.3 });;

  var currentPage = 1;

  $.getJSON('/users/getLocation', function(data) {

    var searchLocation = data.location;
    var searchRadus = 20;
    var adustedDateStamp = '';

    updateVenueList();

    // *************

    function updateVenueList() {

      var urlSearchStr = '/api/search' +
              '?loc=' + searchLocation +
              '&pages=' + VENUES_PER_PAGE +
              '&offset=' + (VENUES_PER_PAGE*(currentPage-1)+1);

      $.getJSON(urlSearchStr, function(venuesArr) {
        $('#return-box').text(venuesArr[0].location.city + ', ' + venuesArr[0].location.state + ' ' + venuesArr[0].location.country);
        $venueList.empty();
        if (venuesArr.error) {
          $venueList.text(venuesArr.error);
        } else {
          var fccWeatherApiUrl = 'https://fcc-weather-api.glitch.me/api/current' +
                  '?lat=' + venuesArr[0].coordinates.latitude +
                  '&lon=' + venuesArr[0].coordinates.longitude;
          $.getJSON(fccWeatherApiUrl, function(weather) {
            adjustedDateStamp = getAdjustedDataStamp(weather.dt);
            venuesArr.forEach(function(venue) {
              $venueList.append(htmlStr(venue));

              $('#' + venue.id).click(function() {
                $.ajax({
                  url: '/api/soirees/' + adjustedDateStamp + '/' + venue.id ,
                  type: 'PUT',
                  success: function(data) {
                    updateGoingButtons(adjustedDateStamp, venue);
                  }
                }); // ajax
              }); // click handler

              updateGoingButtons(adjustedDateStamp, venue);
            }); // forEach
          }); // weather call
        }
      }); // getJSON for Yelp search of location
    } // updateVenueList()

    $('.pagination-btn').click(function() {
      switch (this.id) {
        case 'rew-page':
          currentPage=1;
          break;
        case 'left-page':
          if (currentPage>=2)
            currentPage--;
          break;
        case 'right-page':
          currentPage++
          break;
      }

      if (currentPage<2) {
        $('.pagination-down-btn').removeClass('pagination-btn-enabled').css({ opacity: 0.3 });;
      } else {
        $('.pagination-down-btn').addClass('pagination-btn-enabled').css({ opacity: 1 });;
      }
      updateVenueList();
      $pageDisplayBox.text(currentPage);
    }); // click handler
  });
});

//***************************************
//***************************************
//***************************************

function getAdjustedDataStamp(dt) {

  var dateObj = new Date(dt*1000);

  if (dateObj.getHours()<6)  // wowsers - test???
    dateObj = new Date((dt-60*60*24)*1000);

  var year = dateObj.getFullYear();
  var month = dateObj.getMonth() + 1;
  var date = dateObj.getDate();

  if (month<10)
    month = '0' + month;
  if (date<10)
    date = '0' + date;

  return year + month + date;
}


function htmlStr(venue) {
  var str = '';

  var str  ='<div class="venue-item row">';

  str+=
      '<div class="col-sm-2 going-text">' +
        '<div class="going-btn center" id="' + venue.id + '"></div>' +
        '<div id="visitor-box-' + venue.id + '" class="visitors-box center"></div>' +
      '</div>';

  str+=
      '<div class="col-sm-7">' +
        '<img class="venue-image effectfront" src="' + venue.image_url +
              '" alt="' + venue.name + ' image">' +
        '<div class="venue-name venue-text"><a href="'+ venue.url +
              '" target="_blank">' + venue.name +
              ' (' + venue.price + ')</a></div>' +
      '</div>';

  str+='<div class="col-sm-3 venue-text">' + venue.location.address1 + '</div>';

  str+='</div>';

  return str;
}


function updateGoingButtons(adjustedDateStamp, venue) {
  $.getJSON('/api/soirees/' + adjustedDateStamp + '/' + venue.id, function(data) {

    var visitorCount = data.visitors.length;
    var isUserVisitor = false;

    for (i=0; i< data.visitors.length; i++) {
      if (data.visitors[i].facebookId==data.currentUser.facebookId) {
        isUserVisitor = true;
        break
      }
    }

    $('#visitor-box-' + venue.id).text('visitors: ' + visitorCount);
    if (isUserVisitor)
      $("#" + venue.id).text('You are going!').removeClass('status-not-going').addClass('status-going');
    else
      $("#" + venue.id).text('Not going.').removeClass('status-going').addClass('status-not-going');

  }); // getJSON soiree
}
