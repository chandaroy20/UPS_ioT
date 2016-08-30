myApp.controller('reportController', ['$scope', '$state', '$rootScope', 'reportService', function($scope, $state, $rootScope, reportService) {

  $scope.params=["Temperature","Humidity","Current","Voltage","KW","H2"];
  $scope.selection = ["Temperature","Humidity","Current","Voltage","KW","H2"];
  $scope.toggleSelection = function toggleSelection(param) {
    var idx = $scope.selection.indexOf(param);
    // is currently selected
    if (idx > -1) {
      $scope.selection.splice(idx, 1);
      console.log($scope.selection);
    }

    // is newly selected
    else {
      $scope.selection.push(param);
      console.log($scope.selection);
    }
  };


  $scope.selectedParams=function () {
    $scope.showGraph = $filter('filter')($scope.params, {checked: true});
    console.log($scope.showGraph);
  }
  reportService.getData().then(function(data){
    $scope.graphData=(JSON.stringify(data.data));
    //console.log(JSON.stringify($scope.graphData));

  })
}]);


myApp.directive('multiSeries', function(){
  var width = 800;
  console.log(width);
  height = 500,
  padding = 100;

  return{
    restrict:'EA',
    scope:{
      data:'=',
      checked:'='
    },
    link: function(scope, element, attrs){

      var svg = d3.select(element[0])
      .append("svg")
      .attr("width", width)
      .attr("height", height + 100);
      var selection=scope.checked;
      var data;
      var domain=100;


      //       scope.$watch('checked',function(new,old){
      // if(!new) return;
      //       var checked=new;
      //       console.log(new);
      //       })
      console.log(scope);
      scope.$watch('data', function (newVal, oldVal) {
        svg.selectAll('*').remove();
        if (!newVal) {
          console.log(newVal, oldVal);
          return;
        }
        data=JSON.parse(newVal);
        var temperature = [];
        var humidity = [];
        var h2=[];
        var voltage=[];
        var current=[];
        var kw=[];
        for(var i=0;i<Object.keys((data)).length;i++) {
          temperature.push({"parameter":"temperature","value":data[i].temperature,"date":data[i].date});
          humidity.push({"parameter":"humidity","value":data[i].humidity,"date":data[i].date});
          h2.push({"parameter":"h2","value":data[i].h2,"date":data[i].date});
          voltage.push({"parameter":"voltage","value":data[i].voltage,"date":data[i].date});
          current.push({"parameter":"current","value":data[i].current,"date":data[i].date});
          kw.push({"parameter":"kw","value":data[i].kw,"date":data[i].date});
        }
        //console.log(selection);
        scope.$watchCollection('checked',function(nv,ov){
          if(!nv) return;
          selection=nv;
          console.log(selection);
          change(selection);
          if(selection.length==1)
          {
console.log(selection.length);

            var val=selection[0].toLowerCase();

          domain=d3.max(d3.values(val))
console.log(domain);
          }
        })

        records(temperature, humidity,h2,voltage,current,kw,selection,domain);

      }, true);







      function records(temperature, humidity,h2,voltage,current,kw,selection,domain) {


        //Create the Scale we will use for the Axis
        var xAxisScale = d3.scale.linear()
        .domain([1, 200])
        .range([0, 800]);
        //Create the Axis
        var xAxis = d3.svg.axis().orient("bottom").scale(xAxisScale);

        //Create an SVG group Element for the Axis elements and call the xAxis function
        var xAxisGroup = svg.append("svg:g").attr("transform", "translate(100," + (height - padding +10) + ")").call(xAxis);

        //Create the Scale we will use for the Axis
        var yAxisScale = d3.scale.linear()
        .domain([domain, 0])
        .range([0, 400]);
        //Create the Axis
        var yAxis = d3.svg.axis().orient("left").scale(yAxisScale);

        //Create an SVG group Element for the Axis elements and call the xAxis function
        var yAxisGroup = svg.append("svg:g").attr("transform", "translate("+padding+",10)").call(yAxis);

        //  Define 'div' for tooltips
        // set the opacity to nil

        svg.append("text")
        .attr("class", "yaxis_label")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text("Values (%)");

        svg.append("text")
        .attr("class", "xaxis_label")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (width/2) +","+(height-40)+")")  // text is drawn off the screen top left, move down and out and rotate
        .text("date");

        svg.append("text")
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


        var temperatureGraph = svg.append("svg:path")
        .attr("class", "temperature")
        .attr("d", temperatureLine(temperature))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");
        myParam(temperature);


        //The line SVG Path we draw

        var humidityGraph = svg.append("svg:path")
        .attr("d", humidityLine(humidity))
        .attr("class", "humidity")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("fill", "none");
        myParam(humidity);


        var currentGraph = svg.append("svg:path")
        .attr("d", currentLine(current))
        .attr("class", "current")
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("fill", "none");
        myParam(current);

        var voltageGraph = svg.append("svg:path")
        .attr("d", voltageLine(voltage))
        .attr("class", "voltage")
        .attr("stroke", "orange")
        .attr("stroke-width", 2)
        .attr("fill", "none");
        myParam(voltage)

        var h2Graph = svg.append("svg:path")
        .attr("d", h2Line(h2))
        .attr("class", "h2")
        .attr("stroke", "purple")
        .attr("stroke-width", 2)
        .attr("fill", "none");
        myParam(h2);

        var kwGraph = svg.append("svg:path")
        .attr("d", kwLine(kw))
        .attr("class", "kw")
        .attr("stroke", "yellow")
        .attr("stroke-width", 2)
        .attr("fill", "none");
        myParam(kw);


        function myParam(data)
        {
          var p=data.parameter;
          var div = d3.select("."+p)
          .append("div")  // declare the tooltip div
          .attr("class", "tooltip")              // apply the 'tooltip' class
          .style("opacity", 0);


          svg.selectAll("data.parameter")
          .data(data)
          .enter().append("circle")
          .attr("r", 0)
          .attr("cx", function(d) { return 100+(d.date-1)*(800/55); })
          .attr("cy", function(d) { return (400-d.value*4)+10; })
          .on("mouseover", function(d) {
            div.transition()
            .duration(200)
            .style("opacity", .9);
            div .html((d.date) + "<br/>"  + d.value)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          })
          .on("mouseout", function(d) {
            div.transition()
            .duration(500)
            .style("opacity", 0);
          });
        }


      }

      function change(selection){
        console.log("inside change");
        if(selection.indexOf("Temperature")==-1)
        d3.selectAll(".temperature").attr("visibility","hidden");
        else if(selection.indexOf("Temperature")!=-1) {
          d3.selectAll(".temperature").attr("visibility","visible");
        }
        if(selection.indexOf("KW")==-1) d3.selectAll('.kw').attr("visibility","hidden");
        else if(selection.indexOf("KW")!=-1) {d3.selectAll('.kw').attr("visibility","visible"); }
        if(selection.indexOf("H2")==-1) d3.selectAll('.h2').attr("visibility","hidden");
        else if(selection.indexOf("H2")!=-1) {d3.selectAll('.h2').attr("visibility","visible");}
        if(selection.indexOf("Voltage")==-1) d3.selectAll('.voltage').attr("visibility","hidden");
        else if(selection.indexOf("Voltage")!=-1) {d3.selectAll('.voltage').attr("visibility","visible");}
        if(selection.indexOf("Humidity")==-1) d3.selectAll('.humidity').attr("visibility","hidden");
        else if(selection.indexOf("Humidity")!=-1) {d3.selectAll('.humidity').attr("visibility","visible"); }
        if(selection.indexOf("Current")==-1) d3.selectAll('.current').attr("visibility","hidden");
        else if(selection.indexOf("Current")!=-1) {d3.selectAll('.current').attr("visibility","visible"); }




      }


    }
  };
});
