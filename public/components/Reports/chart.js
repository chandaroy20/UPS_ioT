function records(temperature, humidity,h2,voltage,current,kw,showGraph) {
  var width = parseInt(d3.select("#graph").style("width"));
console.log(width);
  height = 500,
  padding = 100;
  //Create the SVG Viewport selection
  var svgContainer = d3.select("#graph").append("svg")
  .attr("width", width)
  .attr("height", height);

  //Create the Scale we will use for the Axis
  var xAxisScale = d3.scale.linear()
  .domain([1, 200])
  .range([0, 800]);
  //Create the Axis
  var xAxis = d3.svg.axis().orient("bottom").scale(xAxisScale);

  //Create an SVG group Element for the Axis elements and call the xAxis function
  var xAxisGroup = svgContainer.append("g").attr("transform", "translate(100," + (height - padding +10) + ")").call(xAxis);

  //Create the Scale we will use for the Axis
  var yAxisScale = d3.scale.linear()
  .domain([100, 0])
  .range([0, 400]);
  //Create the Axis
  var yAxis = d3.svg.axis().orient("left").scale(yAxisScale);

  //Create an SVG group Element for the Axis elements and call the xAxis function
  var yAxisGroup = svgContainer.append("g").attr("transform", "translate("+padding+",10)").call(yAxis);

  // Define 'div' for tooltips
  var div = d3.select("#graph")
  .append("div")  // declare the tooltip div
  .attr("class", "tooltip")              // apply the 'tooltip' class
  .style("opacity", 0);                  // set the opacity to nil

  svgContainer.append("text")
  .attr("class", "yaxis_label")
  .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
  .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
  .text("Values (%)");

  svgContainer.append("text")
  .attr("class", "xaxis_label")
  .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
  .attr("transform", "translate("+ (width/2) +","+(height-40)+")")  // text is drawn off the screen top left, move down and out and rotate
  .text("date");

  svgContainer.append("text")
  .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
  .attr("transform", "translate("+ (width/2) +","+(height-20)+")")  // text is drawn off the screen top left, move down and out and rotate
  .text("Parameters");

  var temperatureLine = d3.svg.line()
  .x(function(d) { return 100+(d.date-1)*(800/55); })
  .y(function(d) { return (400-d.value*4)+10; })
  .interpolate("linear");

  var humidityLine=d3.svg.line()
  .x(function(d) { return 100+(d.date-1)*(800/55); })
  .y(function(d) { return (400-d.value*4)+10; })
  .interpolate("linear");

  var currentLine=d3.svg.line()
  .x(function(d) { return 100+(d.date-1)*(800/55); })
  .y(function(d) { return (400-d.value*4)+10; })
  .interpolate("linear");

  var voltageLine=d3.svg.line()
  .x(function(d) { return 100+(d.date-1)*(800/55); })
  .y(function(d) { return (400-d.value*4)+10; })
  .interpolate("linear");

  var h2Line=d3.svg.line()
  .x(function(d) { return 100+(d.date-1)*(800/55); })
  .y(function(d) { return (400-d.value*4)+10; })
  .interpolate("linear");

  var kwLine=d3.svg.line()
  .x(function(d) { return 100+(d.date-1)*(800/55); })
  .y(function(d) { return (400-d.value*4)+10; })
  .interpolate("linear");
  //The line SVG Path we draw
  var temperatureGraph = svgContainer.append("path")
  .attr("d", temperatureLine(temperature))
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  .attr("fill", "none");


  //The line SVG Path we draw
if(showGraph.indexOf("Temperature"!=-1))
{  var humidityGraph = svgContainer.append("path")
  .attr("d", humidityLine(humidity))
  .attr("stroke", "red")
  .attr("stroke-width", 2)
  .attr("fill", "none");
}
var currentGraph = svgContainer.append("path")
  .attr("d", currentLine(current))
  .attr("stroke", "green")
  .attr("stroke-width", 2)
  .attr("fill", "none");
  var voltageGraph = svgContainer.append("path")
  .attr("d", voltageLine(voltage))
  .attr("stroke", "orange")
  .attr("stroke-width", 2)
  .attr("fill", "none");
  var h2Graph = svgContainer.append("path")
  .attr("d", h2Line(h2))
  .attr("stroke", "purple")
  .attr("stroke-width", 2)
  .attr("fill", "none");
  var kwGraph = svgContainer.append("path")
  .attr("d", kwLine(kw))
  .attr("stroke", "yellow")
  .attr("stroke-width", 2)
  .attr("fill", "none");



  }
