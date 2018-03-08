const MAP_URL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/441940/world-110m2.json";
const METEOR_URL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json";

d3.json(MAP_URL, function(error, earthData) {
  if (error) throw error;
  d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json", function(error, meteorData) {
    if (error) throw error;

  let margin = { top: 0, bottom: 0, left: 0, right: 0 }

  let width = 800 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom;

  // sort meteor data and get min/max
  
  meteorData.features.map((d) => { if (d.properties.mass == null) d.properties.mass = 0; } );
  meteorData.features.sort((a,b) => b.properties.mass - a.properties.mass);
    
  let maxMeteor = meteorData.features[0].properties.mass;
  let minMeteor = meteorData.features[meteorData.features.length-1].properties.mass;

  // setup map and zoom

  let geo = d3.geo.mercator()
        .translate([0, 0])
        .scale(width/2/Math.PI);

  let zoom = d3.behavior.zoom()
        .scaleExtent([1, 10])
        .on("zoom", function () {
          g.attr("transform", "translate(" + d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
        });

  let path = d3.geo.path()
        .projection(geo);
    
  // define radius and color scales
    
  let radius = d3.scale.pow().exponent(.7)
        .domain([minMeteor, maxMeteor])
        .range([1, 30]);
    
  let color = d3.scale.pow().exponent(.2)
      .domain([minMeteor, maxMeteor])
      .interpolate(d3.interpolateHcl)
      .range(["yellow", "red"]);

  // define svg   

  let svg = d3.select("#chart")
        .append("svg")
        .attr({ width: width, height: height })
        .append('g')
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .call(zoom);

  let g = svg.append('g'); 
 
  g.append('rect')
        .attr({
          class: 'overlay',
          x: -width / 2,
          h: -height /2,
          height: height,
          width: width
        });

  g.append("path")
        .datum(topojson.feature(earthData, earthData.objects.countries))
        .attr("class", "land")
        .attr("d", path);

  g.append("path")
        .datum(topojson.mesh(earthData, earthData.objects.countries, function(a, b) { return a !== b; }))
        .attr("class", "boundary")
        .attr("d", path);    
    
  // define tooltips
    
  let tooltip = d3.tip()
    .attr("class", "d3-tip")
    .html(function(d) { 
      let massStr = "";
      if (d.properties.mass>=10000000)
        massStr = (d.properties.mass/1000).toFixed(0) + " kg (" + Math.round((d.properties.mass/453.592)) + " lbs)";
      else if (d.properties.mass>=10000)
        massStr = (d.properties.mass/1000).toFixed(1) + " kg (" + (d.properties.mass/453.592).toFixed(1) + " lbs)";
      else {
        massStr = (d.properties.mass) + " g (";
        let lbs = Math.floor((d.properties.mass/28.3495)/16);
                             
        if (lbs>0)
          massStr += lbs + " lb" + ((lbs>1)?"s ":" ");
        massStr+=((d.properties.mass/28.3495)%16).toFixed(1) + " oz);"
      } 
    return "<div class='tooltip'><b>Name:</b> " + d.properties.name + "<br><b>Year:</b> " + 
              d.properties.year.slice(0, 4) + "<br><b>Classification:</b> " + d.properties.recclass + 
              "<br><b>Mass:</b> " + massStr + "<br><b>Long:</b> " + d.geometry.coordinates[0].toFixed(1) + 
              "   <b>Lat:</b> " + d.geometry.coordinates[1].toFixed(1) + "</div>";
  });  
    
  svg.call(tooltip);  

  // add circles
    
  let circles = g.selectAll('circle')
        .data(meteorData.features)
        .enter()
        .append('circle')
        .attr({
          cx: (d) => geo([d.properties.reclong, d.properties.reclat])[0],
          cy: (d) => geo([d.properties.reclong, d.properties.reclat])[1],
          r: (d) => { return radius(d.properties.mass); }
        })
        .style('fill', (d) => { return color(d.properties.mass); })
        .attr("fill-opacity", .5)
        .attr("stroke-width", .15)
        .attr("stroke", "#EAFFD0")
        .on('mouseover', tooltip.show)
        .on('mouseout', tooltip.hide);

  }); // get meteor data
}); // get map data