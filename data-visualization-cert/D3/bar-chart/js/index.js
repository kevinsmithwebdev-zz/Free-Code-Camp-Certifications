const DATA_URL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";



$(document).ready(function() {
  $.getJSON(DATA_URL, function(data) {
 
    let gdpData = data.data.map( (d) => 
          { return {
              GDP: +d[1],
              code: parseInt(d[0].substring(0,4)) + Math.ceil(parseInt(d[0].substring(5,7))/3)/10
            }
          });

   let margin = {
      top: 80,
      right: 10,
      bottom: 120,
      left: 115
    }

    let height = 750 - margin.top - margin.bottom;
    let width = 1500 - margin.left - margin.right;

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

    
    let tooltip = d3.select('body')
          .append('div')
          .style('position','absolute')
          .style('background','#f4f4f4')
          .style('padding','3px')
          .style('border','1px #333 solid')
          .style('border-radius','5px')
          .style('text-align', 'center')
          .style('opacity','0');
    
    // define scales
    
    let xScale = d3.scale.ordinal()
          .rangeBands([0, width]); // here
    let yScale = d3.scale.linear()
          .range([height, 0]);
    
    // define domains
    
    xScale.domain( gdpData.map( (d) => { return d.code }) );
    yScale.domain( [0, d3.max(gdpData, (d) => { return d.GDP })]);
    
    // define axes
       
    let xAxis = d3.svg.axis()
          .scale(xScale)
          .tickValues(xScale.domain().filter( function(d, i) { return (d-.1)%5==0; }))
          .tickFormat(d3.format(".4g"))
          .orient("bottom");
   
    function yAxisFormat (num) {
      return "$" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "B";
    }
    
    let yAxis = d3.svg.axis()
          .scale(yScale)
          .ticks(10)
          .tickFormat((d) => yAxisFormat(d))
          .orient("left");

    // draw bars
    let colors = d3.scale.linear()
          .domain([0, d3.max(gdpData, (d) => { return d.GDP })])
          .range(["#53ff53", "#007500"]);
    
    myChart.selectAll('rect')
        .data(gdpData)
        .enter()
        .append('rect')
        .style("fill", '#7d7')
        .attr("height", 0)
        .attr("y", height)
        .transition().duration(animateDuration).delay( (d, i) => { return (i * animateDelay)} )
        .attr({
          'x': (d) => { return xScale(d.code) },
          'y': (d) => { return yScale(d.GDP) },
          'width': xScale.rangeBand(),
          'height': (d) => { return height - yScale(d.GDP) }
        })
        .style('fill', function(d) {
          return colors(d.GDP);
        });

    
    // set mouseover/tooltips
    
    myChart.selectAll('rect')
        .data(gdpData)
        .on('mouseover', function (d) {
          tooltip.transition()
            .style('opacity', 1);
          tooltip.html("<b>$" + d.GDP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Billion</b><br\>" + Math.floor(d.code) + " - Q" + (d.code*10)%10)
            .style('left', (d3.event.pageX)+"px")
            .style('top', (d3.event.pageY-50)+"px");
          d3.select(this).style('opacity', 0.5);
        })
        .on('mouseout', function (d, i) {
          tooltip.transition()
            .style('opacity', 0);
          d3.select(this).style('opacity', 1);
        });
    
    // draw axes
    
    myChart.append('g')
        .attr('class', "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll('text')
        .attr("transform", "rotate(-90)")
        .attr("dx", "-.6em")
        .attr("dy", "-.2em")
        .style("text-anchor", "end")
        .style("font-size", "16px");
    myChart.append('g')
        .attr('class', "y axis")
        .call(yAxis);
     
   // adding grid lines 

    let makeGridY = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(10)
        .tickSize(-width, 0, 0)
        .tickFormat("")

    myChart.append("g")         
        .attr("class", "grid")
        .call(makeGridY);
    
    // x-axis labels
    
    myChart.append("text")
        .attr("transform", "translate(" + (width - margin.left)/2 + " ," + (height + margin.top) + ")")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "32px")
        .text("Year/Quarter");
    
    // y-axis labels   
    myChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "32px")
        .text("GDP (Billions of USD)");
    
    // chart title
    
    myChart.append("text")
        .attr("transform", "translate(" + ((width - margin.left)/ 2) + " ," + (-margin.top/2) + ")")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "42px")
        .text("United States GDP by Year/Quarter (1947-2015)");

    // chart footer
    
    myChart.append("text")
        .attr("transform", "translate(" + ((width - margin.left)/ 2) + " ," + (height + margin.top + margin.bottom/4) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-family", "serif")
        .text("Units: Billions of Dollars Seasonal Adjustment: Seasonally Adjusted Annual Rate Notes: A Guide to the National Income and Product Accounts of the United States (NIPA) - (http://www.bea.gov/national/pdf/nipaguid.pdf)");
  }); // getJSON
}); // doc ready