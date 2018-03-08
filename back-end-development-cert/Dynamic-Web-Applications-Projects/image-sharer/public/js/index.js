const MONTHS_ARR = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
]

$(window).on("load", function() {
  if (userData.isLoggedIn) {
    currentWall = {
      id: userData.id,
      name: userData.displayName
    }
  } else {
    currentWall = {
      id: 'recent',
      name: 'recent'
    }
  }

  var $wallGrid = $('#wall-grid');

  writeWall(currentWall)

  //***************************************

  function writeWall(currentWall) {
    $('#wall-name').text(currentWall.name)
    var url = '/images/wall/' + currentWall.id

    $wallGrid.empty().masonry()
    $wallGrid.masonry('destroy')

    $.getJSON(url, function(wallArr) {
      if (wallArr.error) {
        console.error(wallArr.error)
      } else {
        var html = ''

        if (userData.id == currentWall.id)
          html += adderHtml();

        wallArr.forEach(function(image) {
          html += getImageHtml(image)
        })

        $wallGrid.append(html)

        $wallGrid.masonry({
          itemSelector: '.grid-item',
        })

        $wallGrid.imagesLoaded().progress( function() {
          $wallGrid.masonry('layout');
        })
      }
    }) // writeWall
  }

  $('.wall-btn').click(function() {
    switch (this.id) {
      case 'wall-btn-home':
        currentWall = {
          id: userData.id,
          name: userData.displayName
        }
        break;
      case 'wall-btn-recent':
        currentWall = {
          name: 'recent',
          id: 'recent'
        }
        break;
    }
    writeWall(currentWall);
  }); // .wall-btn click

  $('body').on('click', '.grid-owner', function () {

    if (this.id!=currentWall.id) {
      currentWall = {
        id: this.id,
        name: $(this).text()
      }
    }
    writeWall(currentWall)
  })

  $('body').on('click', '.grid-num-links', function () {

    if (!userData.isLoggedIn)
      return

    var imageOwnerId = $(this).parent().children('.grid-owner').attr('id')

    if (imageOwnerId == userData.id)
      return

    var imageTitle = $(this).parent().children('.grid-title').text()
    var imageUrl = $(this).parent().children('img').prop('src')
    var originalImageId = $(this).parent().children('.grid-num-likes').attr('id')

    var $numLinksBox = $(this).parent().children('.grid-num-links').children('.grid-num-links-box')

    var bodyData = { title: imageTitle, url: imageUrl, originalImageId: originalImageId }

    $.post('/images/relink/', bodyData, function(data) {
      if (data.duplicate)
        alert(data.duplicate)
      else {
        $numLinksBox.text(data.numLinks + 1)
      }
    })
  })

  $('body').on('click', '.grid-delete', function () {
    if (!userData.isLoggedIn)
      return
    var that = this
    var imageId = $(this).parent().attr('id').replace('grid-item-', '')
    $wallGrid.masonry('remove', $(this).parent()).masonry()
    $.ajax({
      url: '/images/' + imageId,
      type: 'DELETE',
      success: function(result) {

      }
    })
  })
}) // doc ready

//***************************************
//***************************************
//***************************************

function adderHtml() {
  return  '<div class="grid-item">' +
            '<h4>Add an image.</h4>' +
            '<a href="/images/add"><i class="fa fa-plus-circle" aria-hidden="true"></i></a>' +
          '</div>';
}
function getImageHtml(image) {
  var gridId = 'grid-item-' + image._id

  var html =  '<div id="' + gridId + '" class="grid-item">' +
                '<img id="img-' + image._id  + '" src="' + image.url + '" class="image-tn" alt="Image - ' + image.title + '">' +
                '<span class="grid-title">' + image.title + '</span>' +
                '<span id="' + image.ownerId + '" class="grid-owner">' + image.ownerName + '</span>' +
                '<span class="grid-date">' + getDateStr(image.date) + '</span>' +
                '<div id="' + image._id + '" class="grid-num-likes">' +
                      getLikesIcon(image) +
                      ' <span class="grid-num-likes-box">' + image.likes.length + '</span>' +
                '</div>' +
                '<span class="grid-num-links"><i class="fa fa-retweet" aria-hidden="true"></i> <span class="grid-num-links-box">' + image.numLinks + '</span></span>' +
                ((userData.id==image.ownerId)?'<span class="grid-delete"><i class="fa fa-trash-o" aria-hidden="true"></i></span>':'') +
              '</div><br>';
  return html
}

function getDateStr(dateString) {
  var d = new Date(dateString)
  return MONTHS_ARR[d.getUTCMonth()] + ' ' + d.getUTCDate() + ', ' + d.getUTCFullYear();
}


function getLikesIcon(image) {
  if (image.likes.indexOf(userData.id)==-1)
    return '<span class="grid-num-likes-icon"><i class="fa fa-heart-o" aria-hidden="true"></i></span>';
  else
    return '<span class="grid-num-likes-icon"><i class="fa fa-heart" aria-hidden="true"></i></span>';
}

$('body').on('click', '.grid-num-likes', function () {
  if (!userData.isLoggedIn)
    return
  var imageId = this.id;
  var ownerId = $(this).siblings('.grid-owner').attr('id')

  if (ownerId==userData.id)
    return;

  $.post('/images/like/' + imageId, function() {
    $.getJSON('/images/' + imageId, function(image) {
      $('#' + imageId + ' > .grid-num-likes-box').text(image.likes.length)
      $('#' + imageId + ' > .grid-num-likes-icon').html(getLikesIcon(image))
    })
  })
});
