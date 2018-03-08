$(function() {
  var apiStr = '/api' + this.location.search;

  $.getJSON(apiStr, function( data ) {
    makePollChart(data);
  });



//***************************************

  function makePollChart(data) {

    var gradientNum=data.choices.length-2;

    var namesArr = [];
    var votesArr = [];

    var maxVote = 0;

    for (var i=data.choices.length-1; i>=0; i--) {
      namesArr.push(data.choices[i].name
        + ((data.choices[i].votes)?"":" (no votes yet)"));
      votesArr.push(data.choices[i].votes);
      if (maxVote<data.choices[i].votes)
        maxVote=data.choices[i].votes;
    }

    if (maxVote==0)
      maxVote=1;
    var maxItems = maxVote+1;

    if (maxItems>10)
      maxItems=null;

    var chartWidth = 600;
    var chartHeight = 400;

    var chartData = {
      type: "hbar",  // Specify your chart type here.

      'scale-x': {  values: namesArr , tick: {visible: false},
        item: { 'max-chars':420, width: chartWidth*.83, 'wrap-text': true, 'offset-x': chartWidth*.85, 'text-align':'left', 'wrap-text': true, bold: true, 'font-size': '14px', 'color': 'black'}},
      series: [ {
        values: votesArr,
        placement: 'opposite',
        "background-color": 'green',
        alpha: .5,
      }],
      'scale-y': { 'max-items': maxItems, decimals: 0, placement: 'opposite', 'minor-tick': {visible: false}}

    };
    zingchart.render({ // Render Method[3]
      id: "poll-chart",
      data: chartData,
      height: chartHeight,
      width: chartWidth
    });

  } // makePollChart()
}); // document ready
