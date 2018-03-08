$(document).ready(function() {

  $selectModal = $('#select-modal');
  $modalHeader = $('#modal-header');
  $modalBody = $('#modal-body');
  $modalFooter = $('#modal-footer');

  $messagesBtn = $('#messages-btn');

  $bookToggleBtn = $('.book-toggle');
  $bookToggleOthers = $('#book-toggle-others');
  $bookToggleMine = $('#book-toggle-mine');

  $.getJSON('api/messages/newCount', function(data) {
    if (data.count)
      $messagesBtn.html($messagesBtn.text() +
            ' - <span class="new-message-count">' + data.count +
            ' New</span>');
  });

  var $masonryGrid = $('#masonry-grid');
  $masonryGrid.imagesLoaded(function() {
    $masonryGrid.masonry({
      itemSelector: 'grid-item',
       columnWidth: 100
    });
  });

  $.getJSON('/api/all', function(data) {

    data.other.forEach(function(book, i) {
      var html =  '<div id="o-' + i + '" class="grid-item other-item">' +
                    '<img src="' + book.imgUrl + '">' +
                  '</div>';
      $masonryGrid.append(html);
    });
    data.user.forEach(function(book, i) {
      var html =  '<div id="u-' + i + '" class="grid-item user-item">' +
                    '<img src="' + book.imgUrl + '">' +
                  '</div>';
      $masonryGrid.append(html);
    });
    $(".user-item").hide();
    $('#masonry-grid').masonry('layout');


    $bookToggleMine.addClass('toggle-not-selected');

    $bookToggleOthers.click(function() {
      $bookToggleOthers.removeClass('toggle-not-selected');
      $bookToggleMine.addClass('toggle-not-selected');
      $(".user-item").hide();
      $(".other-item").show();
    });

    $bookToggleMine.click(function() {
      $bookToggleOthers.addClass('toggle-not-selected');
      $bookToggleMine.removeClass('toggle-not-selected');
      $(".user-item").show();
      $(".other-item").hide();
    });

    $('body').on('click', '.grid-item', function () {
      var gridId = +this.id.match(/\d+/)[0];
      var ownerUrl = '';
      var isUser = this.id[0]=='u';

      var bookObj;
      if (isUser)
        bookObj = data.user[gridId];
      else
        bookObj = data.other[gridId];

      if (this.id[0]=='o')
        ownerUrl = 'users/' + data.other[gridId].ownerId;
      else
        ownerUrl = 'users/' + data.user[gridId].ownerId;

      $.getJSON(ownerUrl, function(ownerData) {
        var headerHtml = '<h2>' + titleAndSubtitleString(bookObj.title, bookObj.subtitle) + '</h2>';
        var bodyHtml =
              '<img class="modal-image effectfront" src="' + bookObj.imgUrl + '" alt="image for ' + bookObj.title + '">' +
              '<h3>Desciption</h3>' +
              '<p>' + bookObj.description + '</p>' +
              '<h3>Owner</h3>' +
              '<p>' +
                '<b>Name:</b> ' + ownerData.name + '<br>' +
                '<b>Username:</b> ' + ownerData.username + '<br>' +
                '<b>Location:</b> ' + ownerData.city + ', ' + ownerData.state + ' ' + ownerData.country
              '</p>';

        $modalHeader.html(headerHtml);
        $modalBody.html(bodyHtml);

        var footerHtml = '';

        if (userData.username==ownerData.username)
          footerHtml += '<button id="delete-book" type="button" class="btn btn-warning">Delete Book</button>';
        else
          footerHtml += '<button id="offer-trade" type="button" class="btn btn-success">Offer Trade</button>';

        footerHtml += '<button id="cancel-book" type="button" class="btn btn-danger">Cancel</button>';
        $modalFooter.html(footerHtml);

        $selectModal.modal("show");

        $('#offer-trade').click(function() {
          $modalHeader.html('<h2>Select which of your books to offer in trade</h2>');

          bodyHtml = '<h3>With which of your books can you part?</h3>';
          bodyHtml += '<div class="container">';
          data.user.forEach(function(book, i) { bodyHtml += smallListItem(book, i) });
          bodyHtml += '</div>';
          $modalBody.html(bodyHtml);

          var footerHtml = '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>';
          $modalFooter.html(footerHtml);

          $('.small-list-item').click(function() {
            var userI = +this.id.match(/\d+/)[0];
            var tradeData;
            $modalHeader.html('<h2>Please confirm your trade offer</h2>');
            $modalBody.html(confirmTradeHtml(data.other[gridId], data.user[userI], ownerData, tradeData));

            var footerHtml =  '<button id="confirm-trade" type="button" class="btn btn-success">Confirm Trade</button>' +
                              '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>';

            $modalFooter.html(footerHtml);
            $('#confirm-trade').click(function() {

              var messageObj = {
                toUserId: ownerData._id,
                toBookId: data.other[gridId]._id,
                fromUserId: userData._id,
                fromBookId: data.user[userI]._id,
                isUnread: true,
                date: new Date(),
                messageType: 'offer'
              };

              $.post("/api/messages", messageObj, function() {;
                $selectModal.modal("hide");
                $(location).attr('href','/');
              });
            });
          });
        }); // click offerTrade

        $('#delete-book').click(function() {
          $.ajax({
              url: '/books/' + bookObj._id + '/' + bookObj.title,
              type: 'DELETE',
              success: function(result) {
                $(location).attr('href','/');
              }
          });
        }); // click delete-book

        $('#cancel-book').click(function() {
          $selectModal.modal("hide");
        }); // click delete-book

      }); // getJSON book owner data
    }); // click on others books
  }); // $.getJSON
}); // document ready

function smallListItem(book, i) {
  return  '<div id="user-book-' + i + '" class="small-list-item">' +
            '<span><img class="small-list-img" src="' + book.imgUrl + '" alt="image for ' + book.title + '"></span>' +
            '<span>' + titleAndSubtitleString(book.title, book.subtitle) + '</span>' +
          '</div>\n';
}

function confirmTradeHtml(otherBook, userBook, ownerData, tradeData) {
  return  '<h4>You are offering to trade your book ...</h4>' +
            confirmHtmlLine(userBook) +
          '<h4>... for ' + ownerData.name + '\'s book ...</h4>' +
            confirmHtmlLine(otherBook) +
            '<p>... who lives in ' + ownerData.city + ', ' + ownerData.state + ' ' + ownerData.country + '</p>' +
          '<h5>Confirming this trade will send a message to ' + ownerData.name + 'to offer the trade.';

  function confirmHtmlLine(book) {
    return '<div>' +
              '<span><img class="small-list-img" src="' + book.imgUrl + '" alt="image for ' + book.title + '"></span>' +
              '<span>' + titleAndSubtitleString(book.title, book.subtitle) + '</span>' +
            '</div>\n';
  }
}
