var yahooFinance = require('yahoo-finance');

const MAX_STOCKS = 5;
var numberStocks = 0;

module.exports = function(io) {

  io.on('connection', function(socket) {

    socket.on('add-stock', function(data){
      if (global.stockObjs.findIndex(function(stockObj) { return stockObj.name==data.stock; })!=-1) {
        io.sockets.emit('add-stock', { error: 'Stock symbol "' + data.stock + '" already in list.', name: data.stock });
      } else if (numberStocks>=MAX_STOCKS) {
        io.sockets.emit('add-stock', { error: 'Max stocks reached: ' + MAX_STOCKS, name: data.stock });
      } else {
        numberStocks++;
        yahooFinance.quote({
          symbol: data.stock,
          modules: [ 'price']
        }, function (err, quote) {
          if (!err) {
            yahooFinance.historical({ symbol: data.stock }, function (err, hData) {
              hData.reverse().forEach(function(entry, index) {
                hData[index] = [Date.parse(entry.date), entry.close];
              });
              var newStockObj = {
                name: data.stock,
                data: hData,
                tooltip: { valueDecimals: 2 },
                info: { fullName: quote.price.shortName, exchange: quote.price.exchangeName, price: quote.price.regularMarketPrice }
              };
              global.stockObjs.push(newStockObj);
              io.sockets.emit('add-stock', newStockObj);
            });
          } else {
            numberStocks--;
            io.sockets.emit('add-stock', { error: 'Stock symbol "' + data.stock + '" not found.', name: data.stock });
          }
        }); // yahooFinance.quote
      } // if/else
    }); // socket.on('add-stock' ...


    socket.on('remove-stock', function(data){
      numberStocks--;
      var index = global.stockObjs.findIndex(function(stockObj) { return stockObj.name==data.stock; });
      global.stockObjs.splice(index, 1);
      io.sockets.emit('remove-stock', data);
    });
  });
}
