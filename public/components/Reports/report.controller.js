myApp.controller('reportController', ['$scope', '$state', '$rootScope', 'reportService', function($scope, $state, $rootScope, reportService) {

  $scope.params=["Temperature","Humidity","Current","Voltage","KW","H2"];
  $scope.selection = ["Humidity","Current","Voltage","KW","H2"];
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
    restrict:'E',
    scope:{
      data:'=',
      checked:'='
    },
    link: function(scope, element, attrs){

      var svg = d3.select(element[0])
      .append("svg")
      .attr("width", width)
      .attr("height", height + 100);

      //       scope.$watch('checked',function(new,old){
      // if(!new) return;
      //       var checked=new;
      //       console.log(new);
      //       })
      console.log(scope);
      scope.$watchCollection('[data,checked]', function (newVal, oldVal) {
        svg.selectAll('*').remove();
        if (!newVal) {
          return;
        }
        var data=JSON.parse(newVal[0]);
        var selection=newVal[1];
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
        console.log(attrs.checked);
        records(temperature, humidity,h2,voltage,current,kw,selection);
      })







      function records(temperature, humidity,h2,voltage,current,kw,selection) {


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
        .domain([100, 0])
        .range([0, 400]);
        //Create the Axis
        var yAxis = d3.svg.axis().orient("left").scale(yAxisScale);

        //Create an SVG group Element for the Axis elements and call the xAxis function
        var yAxisGroup = svg.append("svg:g").attr("transform", "translate("+padding+",10)").call(yAxis);

        // Define 'div' for tooltips
        // var div = d3.select("#graph")
        // .append("div")  // declare the tooltip div
        // .attr("class", "tooltip")              // apply the 'tooltip' class
        // .style("opacity", 0);                  // set the opacity to nil

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
          .attr("d", temperatureLine(temperature));
          if(selection.indexOf("Temperature")!=-1)
          {
        temperatureGraph.attr("stroke", "blue")
          .attr("stroke-width", 2)
          .attr("fill", "none");
        }
else temperatureGraph.attr("display","none");


        //The line SVG Path we draw

        var humidityGraph = svg.append("svg:path")
        .attr("d", humidityLine(humidity))
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("fill", "none");

        var currentGraph = svg.append("svg:path")
        .attr("d", currentLine(current))
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("fill", "none");
        var voltageGraph = svg.append("svg:path")
        .attr("d", voltageLine(voltage))
        .attr("stroke", "orange")
        .attr("stroke-width", 2)
        .attr("fill", "none");
        var h2Graph = svg.append("svg:path")
        .attr("d", h2Line(h2))
        .attr("stroke", "purple")
        .attr("stroke-width", 2)
        .attr("fill", "none");
        var kwGraph = svg.append("svg:path")
        .attr("d", kwLine(kw))
        .attr("stroke", "yellow")
        .attr("stroke-width", 2)
        .attr("fill", "none");



      }

    }
  };
});
