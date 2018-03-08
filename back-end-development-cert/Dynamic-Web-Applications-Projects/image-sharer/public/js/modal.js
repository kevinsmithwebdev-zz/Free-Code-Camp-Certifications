$(document).ready(function() {

  var $modalContainer = $('#modal-container')

  var $modal = $('#my-modal');
  var $modalImage = $("#modal-image");
  var $captionText = $("#caption");
  var $modalClose = $("#modal-close")

  $('body').on('click', '.image-tn', function() {
    $modal.css("display", "block");
    $modalImage.attr("src", this.src);
    $captionText.text($(this).parent().children('.grid-title').text());
  })

  $modalImage.click(function() {
    $modal.css('display',"none");
  })
  $modalClose.click(function() {
    console.log('close click')
    $modal.css('display',"none");
  })

})
