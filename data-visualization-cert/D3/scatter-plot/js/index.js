const DATA_URL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

$(document).ready(function() {
  // load data
  $.getJSON(DATA_URL, function(data) {

    // create code for if there are doping allegations
    
    let bestTime = data[0].Seconds;
      
    data.forEach((d) => { 
          if (d.Doping=="")
            d.DopingStatus = "No Allegations";
          else if (d.Doping.match(/alleg/i))
            d.DopingStatus = "Doping Alleged";
          else
            d.DopingStatus = "Doping Proven";
          d.Trailing = d.Seconds - bestTime;
        });

    // setup dimensions

    let margin = {top: 70, right: 95, bottom: 35, left: 30},
        width = 1200 - margin.left - margin.right,
        height = 710 - margin.top - margin.bottom;

    // setup x 

    function zeroPad2(n) {
      return (n < 10) ? ("0" + n) : n;
    }
    
    
    let xValue = function(d) { return d.Trailing;}, 
        xScale = d3.scale.linear().range([width, 0]), 
        xMap = function(d) { return xScale(xValue(d));},
        xAxis = d3.svg.axis()
                .scale(xScale)
                .tickFormat((d) => {
                  return Math.floor(d/60) + ":" + zeroPad2(Math.floor(d%60));
                })
                .orient("bottom");

    // setup y 

    let yValue = function(d) { return d.Place;}, 
        yScale = d3.scale.linear().range([0, height]), 
        yMap = function(d) { return yScale(yValue(d));}, 
        yAxis = d3.svg
                .axis()
                .scale(yScale)
                .ticks(10)
                .orient("left");

    // setup fill color

    let cValue = function(d) { return d.DopingStatus;},
        color = d3.scale.category10();

    // add the graph

    var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // define tooltip

    var tooltip = d3.select("body").append("div")
          .append('div')
          .style('position','absolute')
          .style('background','#f4f4f4')
          .style('padding','3px')
          .style('border','1px #333 solid')
          .style('border-radius','5px')
          .style('text-align', 'center')
          .style('opacity','0');

    // setup domains w/ gutter
    
    xScale.domain([d3.min(data, xValue), d3.max(data, xValue) + 2]);
    yScale.domain([d3.min(data, yValue), d3.max(data, yValue) + 1]);

    // x-axis
    
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Minutes:Seconds Behind Fastest Time");

    // y-axis
    
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Ranking");

    // draw dots
    
    let gDots = svg.selectAll("g.dot")
            .data(data)
            .enter().append('g');
            
    gDots.append("circle")
        .attr("class", "dot")
        .attr("r", 6)
        .attr("cx", xMap )
        .attr("cy", yMap )
        .style("fill", function(d) { return color(cValue(d));})
    
    // add dot labels
    
    gDots.append("text").text( (d) => { return d.Name; })
      .attr("x", (d) => { return xScale(d.Trailing) + 7; })
      .attr("y", (d) => { return yScale(d.Place) + 5.5; })
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px");

    // mouse events
    
    function secondsToStr(d) {
      
      if (d==0)
        return "best time"
      
      let m = Math.floor(d % 3600 / 60);
      let s = Math.floor(d % 3600 % 60);
      let timeStr = "";

      if (m!=0) {
        timeStr += m.toString() + " minute";
        timeStr += (m>1)?"s":"";
        timeStr += " and "
      }
      timeStr += s.toString() + " second";
      timeStr += (s>1)?"s":"";
      timeStr += " behind best time";
      
      return timeStr;
    }
    
    function dopingStr (str) {
      if (str=="")
        return "No doping allegations";
      else
        return str;
    }
    
    svg.selectAll('circle')
        .data(data)
        .on('mouseover', function (d) {
          tooltip.transition()
            .style('opacity', 1);
          tooltip.html("<b>" + d.Name + " - " + d.Nationality + " - " + d.Year + "</b><br/>" + d.Time + 
                       "  -  " + secondsToStr(d.Trailing) + "<br/><br/>" + dopingStr(d.Doping))
            .style('left', width/1.6 + "px")
            .style('top', height/1.1 + "px");
          d3.select(this).style('opacity', 0.5);
        })
        .on('mouseout', function (d, i) {
          tooltip.transition()
            .style('opacity', 0);
          d3.select(this).style('opacity', 1);
        });
    
      // draw legend
    
      var legend = svg.selectAll(".legend")
            .data(color.domain())
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(-10," + ( height/3+ i * 20) + ")"; });

      // draw legend colored rectangles
    
      legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

      // draw legend text
    
      legend.append("text")
          .text("title")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d;})
    
   // chart title
    
    svg.append("text")
        .attr("transform", "translate(" + (width/2 + margin.left) + " ," + (40 - margin.top) + ")")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "42px")
        .text("Doping in Professional Bicycle Racing");
    
    svg.append("text")
        .attr("transform", "translate(" + (width/2 + margin.left) + " ," + (90 - margin.top) + ")")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "32px")
        .text("35 fastest times up Aple d'Huez");

    svg.append("text")
        .attr("transform", "translate(" + (width/2 + margin.left) + " ," + (115 - margin.top) + ")")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "20px")
        .text("Normalized to 13.8km");   
    
  }); // get json
}); // document ready