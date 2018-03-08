$( document ).ready(function() {
  $('#get-current-location').click(function() {
    $.getJSON('/api/location', function (data) {
      $('#location-box').val(data.location);
    });
  });
});
