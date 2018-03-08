$(document).ready(function() {

  var $totalData = $('#total-messages .data');
  var $unreadData = $('#unread-messages .data');
  var $readData = $('#read-messages .data');
  var $messagesListUnread = $('#messages-list-unread');
  var $messagesListRead = $('#messages-list-read');

  var messagesUrl = '/api/messages';

  $.getJSON(messagesUrl, function(messageData) {

    var totalMsg = messageData.length;
    var unreadMsg = 0;
    var readMsg = 0;

    messageData.forEach(function(msg, i) {
      if (msg.data.isUnread) {
        $messagesListUnread.append(msgListHtml(msg, i));
        unreadMsg++;
      } else {
        $messagesListRead.append(msgListHtml(msg, i));
        readMsg++;
      }
    });

    $totalData.text(totalMsg);
    $unreadData.text(unreadMsg);
    $readData.text(readMsg);

    $('.msg-item').click(function() {
      var id = extractId(this.id);
      if (messageData[id].data.isUnread) {
        messageData[id].isUnread = false;
        $.post('/messages/read/' + messageData[id].data._id, function() {});
      }
      showMsg(messageData[id]);
    });
  });
});

//***************************************
//***************************************
//***************************************

function showMsg(msg) {

  switch (msg.data.messageType) {
    case 'offer':
      renderOffer(msg);
      break;
    case 'accept':
      renderAccept(msg);
      break;
    case 'reject':
      renderReject(msg);
      break;
  }
}

//***************************************

function msgListHtml(msg, i) {
  var html = '';

  switch (msg.data.messageType) {
    case 'offer':
      html += '<div id="msg-' + i + '" class="msg-item ' + (msg.data.isUnread?'msg-unread':'msg-read') + '">' +
                'Offer from <b>' + msg.fromUserObj.name + '</b> to trade <b>' +
                msg.fromBookObj.title + '</b> for your book <b>' +
                msg.toBookObj.title + '</b>.' +
              '</div>';
      break;
      case 'accept':
        html += '<div id="msg-' + i + '" class="msg-item ' + (msg.data.isUnread?'msg-unread':'msg-read') + '">' +
                  '<b>' + msg.fromUserObj.name + '</b> has accepted your offer to trade <b>' +
                  msg.fromBookObj.title + '</b> for your book <b>' +
                  msg.toBookObj.title + '</b>.' +
                '</div>';
        break;
      case 'reject':
        html += '<div id="msg-' + i + '" class="msg-item ' + (msg.data.isUnread?'msg-unread':'msg-read') + '">' +
                  '<b>' + msg.fromUserObj.name + '</b> has rejected your offer to trade <b>' +
                  msg.fromBookObj.title + '</b> for your book <b>' +
                  msg.toBookObj.title + '</b>.' +
                '</div>';
        break;
  }
  return html;
}
//***************************************
function renderOffer(msg) {
  var $selectModal = $('#select-modal');
  var $modalHeader = $('#modal-header');
  var $modalBody = $('#modal-body');
  var $modalFooter = $('#modal-footer');

  $modalHeader.html('<h2>Offer Information</h2>');

  var bodyHtml =
        '<div>' +
          '<h3><b>' + msg.fromUserObj.name + '</b> has offered to trade his/her book:</h3>' +
          '<h5><b>Location:</b> ' + msg.fromUserObj.city + ', ' + msg.fromUserObj.state + ' ' + msg.fromUserObj.country + '<br>' +
          '<b>Email:</b> ' + msg.fromUserObj.email + '<br>' +
          '(In development mode, emails will not be sent.)</h5>' +
          messageBookRender(msg.fromBookObj) +
        '</div>' +
        '<div>' +
          '<h3>... for your book:</h3>' +
          messageBookRender(msg.toBookObj) +
        '</div>';

  $modalBody.html(bodyHtml);

  var footerHtml =
        '<div class="msg-btns">' +
          '<button id="offer-accept" class="btn btn-success">Accept Offer</button>' +
          '<button id="offer-reject" class="btn btn-warning">Reject Offer</button>' +
          '<button id="offer-cancel" class="btn btn-danger">Cancel</button>' +
        '</div>';

  $modalFooter.html(footerHtml);

  $selectModal.modal("show");

  $('#offer-accept').click(function() {
    $.ajax({
      url: '/messages/' + msg.data._id,
      type: 'DELETE',
      success: function(result) {
      }
    });

    var messageObj = {
      toUserId: msg.data.fromUserId,
      toBookId: msg.data.fromBookId,
      fromUserId: msg.data.toUserId,
      fromBookId: msg.data.toBookId,
      isUnread: true,
      date: new Date(),
      messageType: 'accept'
    };

    $.post("/api/messages", messageObj, function() {
      $selectModal.modal("hide");
      $(location).attr('href','./messages');
    });
    // $.ajax({
    //   url: '/books/two/' + msg.data.toBookId + '/' + msg.data.fromBookId,
    //   type: 'DELETE',
    //   success: function(result) { }
    // });
  });

  $('#offer-reject').click(function() {
    $.ajax({
      url: '/messages/' + msg.data._id,
      type: 'DELETE',
      success: function(result) {
      }
    });

    var messageObj = {
      toUserId: msg.data.fromUserId,
      toBookId: msg.data.fromBookId,
      fromUserId: msg.data.toUserId,
      fromBookId: msg.data.toBookId,
      isUnread: true,
      date: new Date(),
      messageType: 'reject'
    };

    $.post("/api/messages", messageObj, function() {
      $selectModal.modal("hide");
      $(location).attr('href','./messages');
    });
  });
  $('#offer-cancel').click(function() {
    $selectModal.modal("hide");
  });
}
//***************************************
function renderAccept(msg) {
  var $selectModal = $('#select-modal');
  var $modalHeader = $('#modal-header');
  var $modalBody = $('#modal-body');
  var $modalFooter = $('#modal-footer');

  $modalHeader.html('<h2>Accept Information</h2>');

  var bodyHtml =
      '<div>' +
        '<h3><b>' + msg.fromUserObj.name + '</b> has accepted your trade offer.</h3>' +
        '<h5><b>Location:</b> ' + msg.fromUserObj.city + ', ' + msg.fromUserObj.state + ' ' + msg.fromUserObj.country + '<br>' +
        '<b>Email:</b> ' + msg.fromUserObj.email + '<br>' +
        '(In development mode, emails will not be sent.)</h5>' +
        messageBookRender(msg.fromBookObj) +
      '</div>' +
      '<div>' +
        '<h3>... for your book:</h3>' +
        messageBookRender(msg.toBookObj) +
      '</div>';

  $modalBody.html(bodyHtml);

  var footerHtml =
        '<div class="msg-btns">' +
          '<button id="accept-delete" class="btn btn-warning">Delete Message</button>' +
          '<button id="accept-cancel" class="btn btn-danger">Cancel</button>' +
        '</div>';

  $modalFooter.html(footerHtml);

  $selectModal.modal("show");

  $('#accept-delete').click(function() {
    $.ajax({
      url: '/messages/' + msg.data._id,
      type: 'DELETE',
      success: function(result) {  }
    });
    $(location).attr('href','./messages');
  });
  $('#accept-cancel').click(function() {
    $selectModal.modal("hide");
  });
}
//***************************************
function renderReject(msg) {
  var $selectModal = $('#select-modal');
  var $modalHeader = $('#modal-header');
  var $modalBody = $('#modal-body');
  var $modalFooter = $('#modal-footer');

  $modalHeader.html('<h2>Accept Information</h2>');

  var bodyHtml =
      '<div>' +
        '<h3><b>' + msg.fromUserObj.name + '</b> has rejected your trade offer.</h3>' +
        messageBookRender(msg.fromBookObj) +
      '</div>' +
      '<div>' +
        '<h3>... for your book:</h3>' +
        messageBookRender(msg.toBookObj) +
      '</div>';

  $modalBody.html(bodyHtml);

  var footerHtml =
        '<div class="msg-btns">' +
          '<button id="reject-delete" class="btn btn-warning">Delete Message</button>' +
          '<button id="reject-cancel" class="btn btn-danger">Cancel</button>' +
        '</div>';

  $modalFooter.html(footerHtml);

  $selectModal.modal("show");

  $('#reject-delete').click(function() {

    $.ajax({
      url: '/messages/' + msg.data._id,
      type: 'DELETE',
      success: function(result) {}
    });
    $(location).attr('href','./messages');
  });
  $('#reject-cancel').click(function() {
    $selectModal.modal("hide");
  });
}
