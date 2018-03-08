
$(document).ready(function() {

  var $imageUrl = $('#image-url');
  var $imagePreview = $('#image-preview');

  $imageUrl.focusout(function() {
    var imgUrl = $imageUrl.val();
    if (!imgUrl)
      return;
    $imagePreview.html('<p>Loading...</p>');
    var fileURL = imgUrl;
    resourceExists(fileURL, function(imgExists) {
      if(imgExists) {
        $imagePreview.html('<img class="image-preview" src="' + imgUrl + '">');
      } else {
        $imagePreview.html('<p>Image "'+ imgUrl + '" not found.</p>');
      }
    });
  });
});
