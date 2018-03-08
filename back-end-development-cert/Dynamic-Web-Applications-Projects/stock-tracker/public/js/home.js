var stockObjArr = [];
var stockGraph;

const MSG_DELAY = 5000;
const MAX_STOCKS = 5;

$(document).ready(function() {

  // make connection
  var socketAddress = window.location.protocol +
                '//' + window.location.hostname +
                ':' + window.location.port;

  var socket = io.connect(socketAddress);

  var $messageBox = $('#message-box');
  var $stockBox = $('#stock-box');
  var $submitBtn = $('#submit-btn');
  var $stocksList = $('#stock-list');
  var $stockInput = $('.stock-input');

  // socket handlers

  socket.on('add-stock', function(data) {
    $('#' + data.name + '-msg').fadeOut(300, function(){
        $(this).remove();
    });

    if (data.error) {
      var html =  '<div id="' + data.name +'-err-msg" class="message-box-error">' +
                    'Error returned: ' + data.error +
                  '</div>';

      $messageBox.prepend(html);
      setTimeout(function() {
        $('#' + data.name + '-err-msg').fadeOut(300, function(){
            $(this).remove();
        });
      }, MSG_DELAY);

    } else {
      addStock(data);
    }
    updateSubmitBtn();
  });

  socket.on('remove-stock', function(data) {
    removeStock(data);
    updateSubmitBtn();
  });

  // fill initial list

  function getInitialList() {
    $.getJSON('/api/list', function(data) {
      for (var i=0; i<data.length; i++) {
        addStock(data[i]);
      }
      buildGraph(stockObjArr);
    });
  }

  getInitialList();

  function addStock(stockObj) {
    stockObjArr.push(stockObj);
    $('#stock-list').append(stockListItem(stockObj));
    buildGraph(stockObjArr);
  }

  function removeStock(data) {
    var index = stockObjArr.findIndex(function(stockObj) { return stockObj.name==data.stock; });
    stockObjArr.splice(index, 1);
    $('#' + data.stock).remove();
    buildGraph(stockObjArr);
  }

  // submit box

  $stockBox.keypress(function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      submitFromBox();
    }
  });

  $submitBtn.click(function() {
    submitFromBox();
  });

  function submitFromBox() {
    var stock = $stockBox.val().trim().toUpperCase();

    var html =  '<div id="' + stock +'-msg" class="message-box-retrieve">' +
                  'Retrieving data for ' + stock + ' ...' +
                '</div>';

    $messageBox.prepend(html);

    socket.emit('add-stock', {
      stock: stock
    });
    $stockBox.val('');
  }

  function updateSubmitBtn() {
    if (stockObjArr.length>=MAX_STOCKS) {
      $stockInput.prop("disabled",true);

      var html =  '<div id="max-stock-msg" class="message-box-error">' +
                    'Max stocks reached: ' + MAX_STOCKS +
                  '</div>';


      $messageBox.prepend(html);
      setTimeout(function() {
        $('#max-stock-msg').fadeOut(300, function(){
            $(this).remove();
        });
      }, MSG_DELAY);
    } else
      $stockInput.prop("disabled",false);
  }

  // remove handlers

  var $stockRemove = $('.stock-remove');

  $('body').on('click', '.stock-remove', function () {
    socket.emit('remove-stock', { stock: this.id });
  });

}); // doc ready

//*************

function stockListItem(stockObj) {
  var html =  '<div id="' + stockObj.name + '" class="row stocks-list-item">' +
                '<div class="col-sm-1 stocks-list-name">' + stockObj.name + '</div>' +
                '<div class="col-sm-3 stocks-list-fullname">' + stockObj.info.fullName + '</div>' +
                '<div class="col-sm-4 stocks-list-exchange">' + stockObj.info.exchange + '</div>' +
                '<div class="col-sm-3 stocks-list-price">' + 'Current Price: ' + stockObj.info.price + '</div>' +
                '<div class="col-sm-1 remove-container">' +
                  '<div id="' + stockObj.name + '" class="stock-remove">X</div>' +
                '</div>' +
              '</div>';
  return html;
}

//*************

function buildGraph() {

  for (var i=0; i<stockObjArr.length; i++) {
    stockObjArr[i].compare = undefined;
    stockObjArr[i]._colorIndex = i;
    stockObjArr[i]._symbolIndex = i;
    $('#' + stockObjArr[i].name).css("background-color", Highcharts.getOptions().colors[i]);
    if (i==1)
      $('#' + stockObjArr[i].name).css("color", 'white');
    else
      $('#' + stockObjArr[i].name).css("color", 'black');
  }

  stockGraph = new Highcharts.stockChart('stock-graph', {
    rangeSelector: { selected: 1 },
    title: { text: 'Kevin\'s Stock Tracker App' },
    subtitle: { text: 'Powered by the Yelp Finance API' },
    series: stockObjArr
  }); // Highcharts.StockChart
}
