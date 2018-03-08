
function resourceExists(url, callback) {
  $.getJSON('/api/exists/' + encodeURIComponent(url), function(status) {
    callback(status)
  })
}
