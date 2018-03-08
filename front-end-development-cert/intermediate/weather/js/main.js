function windCompass(brng) {

  var bearings = ["NNE", "NE", "ENE", "E",
                  "ESE", "SE", "SSE", "S",
                  "SSW", "SW", "WSW", "W",
                  "WNW", "NW", "NNW", "N"];

  var index = brng - 11.25;
  if (index < 0)
      index += 360;
  index = parseInt(index / 22.5);

  return(bearings[index]);
}

function distanceLatLon(lat1,lon1,lat2,lon2) {

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;

  function deg2rad(deg) {
  return deg * (Math.PI/180)
}
}

$(document).ready(function() {

  var lat;
  var lon;

  $.getJSON("http://ip-api.com/json", function (data) {
    lat = data.lat;
    lon = data.lon;

    var WeatherAPICall = "http://api.openweathermap.org/data/2.5/weather?lat="
          + lat + "&lon=" + lon + "&appid=3864f48bfe6a511e20e809ee8857fe16";

    $.getJSON(WeatherAPICall, function(data2){  //JSON cal to Open Weather API

      var iconUrl = "http://openweathermap.org/img/w/" + data2.weather[0].icon + ".png";

      var fTemp = (data2.main.temp * (9/5) - 459.67).toFixed(1);
      var fTempMin = (data2.main.temp_min * (9/5) - 459.67).toFixed(1);
      var fTempMax = (data2.main.temp_max * (9/5) - 459.67).toFixed(1);
      var cTemp = (data2.main.temp - 273.15).toFixed(1);
      var cTempMin = (data2.main.temp_min - 273.15).toFixed(1);
      var cTempMax = (data2.main.temp_max - 273.15).toFixed(1);
      var kDist = (distanceLatLon(37.8047,-122.2124,lat,lon)).toFixed(1);
      var mDist = (distanceLatLon(37.8047,-122.2124,lat,lon) * 0.621371).toFixed(1);
      var kphWind = (data2.wind.speed * 3.6).toFixed(1);
      var mphWind = (data2.wind.speed * 2.23694).toFixed(1);
      var iHgPress = (data2.main.pressure * 0.0295299830714).toFixed(1);
      var mbPress = (data2.main.pressure * 0.01).toFixed(1);

      document.getElementById("locationArea").innerHTML = "<b>Current location:</b> " + data2.name;
      document.getElementById("conditionsArea").innerHTML = "<b>Weather conditions:</b> " + data2.weather[0].description + " " + "<img src = \"" + iconUrl + "\"alt = \"weather image\" style = \"width:80px;height:80px;\">";
      document.getElementById("currentTempArea").innerHTML = '<b>Current temperature:</b> <span class = "imperial">' + fTemp + '&deg;F</span><span class = "metric">' + cTemp + '&deg;C</span>  </br>';
      document.getElementById("rangeTempArea").innerHTML = "<b>Temp min:</b> " + '<span class = "imperial">' + fTempMin + '&deg;F</span><span class = "metric">' + cTempMin + '&deg;C</span>   <b>Temp max:</b><span class = "imperial">' + fTempMax + '&deg;F</span><span class = "metric">' + cTempMax + '&deg;C</span>';
      document.getElementById("pressHumidArea").innerHTML = "<b>Humidity:</b> " + data2.main.humidity + "%   <b>Pressure:</b> " + '<span class = "imperial">' + iHgPress + ' inHg</span><span class = "metric">' + mbPress + ' mBar</span>';
      document.getElementById("windArea").innerHTML = '<b>Wind Speed:</b> ' + '<span class = "imperial">' + mphWind + ' mph</span><span class = "metric">' + kphWind + ' kph</span>   <b>Direction:</b> ' + windCompass(data2.wind.deg);

      document.getElementById("distanceArea").innerHTML = "<b>Fun fact:</b> You are " + '<span class = "imperial">' + mDist + ' miles</span><span class = "metric">' + kDist + ' km</span> from Kevin\'s house.';

    });
  });

  var imperial = true;

  $("#convertBTN").on("click", function() {

    if (imperial) {
      $(".imperial").css("display", "none");
      $(".metric").css("display", "inline");
    } else {
      $(".imperial").css("display", "inline");
      $(".metric").css("display", "none");
    }
    imperial = !imperial;
  });
});
