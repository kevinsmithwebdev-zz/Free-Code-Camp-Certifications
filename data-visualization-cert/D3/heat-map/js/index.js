
const TEMP_URL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

d3.json(TEMP_URL, function(error, response) {

  if (error) throw error;
  
  let data = response.monthlyVariance.slice();  
  let lowestYear = data[0].year;
  let highestYear = data[data.length-1].year;  
  data.forEach((d) => { d.dateCode = new Date(d.year, d.month); });

  const MONTHS = ["January", "February", "March", "April", 
                  "May", "June", "July", "August", 
                  "September", "October", "November", "December"];
  
  const COLORS_ARR = ["#4000ff", "#0040FF", "#0174DF", "#01DF3A", "#D7DF01", 
                        "#FFBF00", "#FF8000", "#FF4000", "#FF0000"];

  let baseTemperature = response.baseTemperature;
  let highVariance = data.reduce( (prev, current) => { return (prev.variance > current.variance) ? prev : current }).variance;
  let lowVariance = data.reduce( (prev, current) => { return (prev.variance < current.variance) ? prev : current }).variance;
  
  
  let margin = { top: 100, bottom: 100, left: 90, right: 10 }

  let width = 1000 - margin.right - margin.left,
      height = 600 - margin.top - margin.bottom;

  let xElements = d3.set(data.map( (d) => { return d.dateCode; } )).values(),
      yElements = d3.set(data.map( (d) => { return MONTHS[d.month-1]; } )).values();
  
  let cellWidth = width / (data.length/MONTHS.length),
      cellHeight = height / MONTHS.length;

  let animateDuration = 30;
  let animateDelay = 3;

  let myChart = d3.select("#chart")
        .append("svg")
        .attr ({
          "width": width + margin.right + margin.left,
          "height": height + margin.top + margin.bottom
        })
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");    

  // style tooltips
  
  let tooltip = d3.select("#heatmap")
        .append('div')
        .style('position','absolute')
        .style('background','#f4f4f4')
        .style('padding','3px')
        .style('border','1px #333 solid')
        .style('border-radius','4px')
        .style('text-align', 'center')
        .style('opacity','0');

  // define scales
  
  let xScale = d3.scale.linear()
        .domain( [lowestYear, highestYear])
        .range([0, width]); 
  
  let yScale = d3.scale.linear()
        .domain([0, 12])
        .range([0, height]);

  // define axes
  
  let xAxis = d3.svg.axis()
        .scale(xScale)
        .ticks(20)
        .tickFormat((d) => { return d; })
        .orient("bottom");

  let yAxis = d3.svg.axis()
        .scale(yScale)
        .ticks(12)
        .tickFormat((d) => { return MONTHS[d-1]; })
        .orient("left");

  // setup color scale

  let colorScale = d3.scale.quantize()
        .domain([lowVariance + baseTemperature, highVariance + baseTemperature])
        .range(COLORS_ARR);
 
  // setup canvas
  
  let svg = d3.select('#heatmap')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // define cells
  
  let cells = svg.selectAll('rect')
        .data(data)
        .enter().append('g').append('rect')
        .attr('class', 'cell')
        .attr('width', cellWidth)
        .attr('height', cellHeight)
        .attr("x", (d) => { return (d.year - lowestYear) * cellWidth; })
        .attr("y", (d) => { return (d.month -1) * cellHeight; })
        .attr('fill', (d) => { return colorScale(d.variance + baseTemperature); });

  // mouse events for cells
  
  svg.selectAll('rect')
        .data(data)
        .on('mouseover', function (d) {
          tooltip.transition()
            .style('opacity', 1);
          tooltip.html("<b>Month/Year:</b> " + MONTHS[d.month-1] + "/" + d.year + "<br/><b>Variance</b> " + d.variance)
            .style('left', width/2 + "px")
            .style('top', height + margin.top + margin.bottom*1.2 + "px");
          d3.select(this).style('opacity', 0.5);
        })
        .on('mouseout', function (d, i) {
          tooltip.transition()
            .style('opacity', 0);
          d3.select(this).style('opacity', 1);
        });  

  // draw axes

  svg.append('g')
    .attr('class', "x axis")
    .attr("transform", "translate(" + 2 + "," + (height-5) + ")")
    .call(xAxis)
    .selectAll('text')
    .attr("transform", "rotate(-90)")
    .attr("dx", "-.6em")
    .attr("dy", "-.2em")
    .style("text-anchor", "end")
    .style("font-size", "16px");
  
  svg.append('g')
    .attr('class', "y axis")
    .attr("transform", "translate(" + 5 + "," + (-height/24) + ")")
    .call(yAxis);

  // legend
  
  const LEGEND_CELL_SIZE = 18;
  const LEGEND_CELL_SPACING = 24;  
  
  let legend = svg.selectAll(".legend")
        .data(COLORS_ARR)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(" + (-200 + + i * LEGEND_CELL_SPACING) + "," + (height + 60) + ")"; });
  
  legend.append("rect")
        .attr("x", width - LEGEND_CELL_SIZE)
        .attr("width", LEGEND_CELL_SIZE)
        .attr("height", LEGEND_CELL_SIZE)
        .style("fill", (d, i ) => { return COLORS_ARR[i]; });
  
  legend.append("text")
       .text("title")
       .attr("x", width + LEGEND_CELL_SIZE/5)
       .attr("y", LEGEND_CELL_SPACING*1.2)
       .attr("dy", ".35em")
       .style("text-anchor", "end")
       .text(function(d, i) { 
           return (i==0||i==(COLORS_ARR.length-1)/2||i==(COLORS_ARR.length-1))?
              (lowVariance + (highVariance-lowVariance)*(i/(COLORS_ARR.length-1))).toFixed(1):"";
         });
  
  // title
  
    svg.append("text")
        .attr("transform", "translate(" + (width + margin.right - margin.left)/2 + " ," + (40 - margin.top) + ")")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "36px")
        .text("Monthly Global Land-Surface Temperature (1753\u20132015)");

    svg.append("text")
        .attr("transform", "translate(" + (width + margin.right - margin.left)/2  + " ," + (-margin.top/3) + ")")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "12px")
        .text("Temperatures are in Celsius and reported as anomalies relative to the Jan/1951\u2013Dec/1980 average.");
    svg.append("text")
        .attr("transform", "translate(" + (width + margin.right - margin.left)/2  + " ," + (-margin.top/5) + ")")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "12px")
        .text("Estimated Jan 1951-Dec 1980 absolute temperature \u2103: 8.66 +/- 0.07");

});