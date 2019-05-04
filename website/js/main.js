//state = 0 no measure process is going on
//state = 1 stand motion type
//state = 2 walk motion type
//state = 3 run motion type

var state = 0;
var stand = 0;
var walk = 0;
var run = 0;

$(document).ready(function() {
  $("#start").click(startMeasure);
  $("#pause").click(pauseMeasure);
  $("#finish").click(finishMeasure);
  $("#generate").click(generateMap);
  startTimer()
});

function startMeasure() {
  var motionType = document.getElementById("motion").value;
  if (motionType == "None") {
    console.log("No motion type is selected");
  } else {
    console.log("Start measure");
  }
}

function pauseMeasure() {
  console.log("Pause measure");
  state = 0;
}

function finishMeasure() {
  console.log("Finish current measure process");
  state = 0;
}

function generateMap() {
  console.log("Generate map");
}

function startTimer() {
  var countDown = 180*1000
  var x = setInterval(function() {
      
    // Time calculations for minutes and seconds
    var minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((countDown % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("Timer").innerHTML = minutes + "min " + seconds + "sec ";
      
    countDown = countDown - 1000
    // If the count down is over, write some text 
    if (countDown < 0) {
      clearInterval(x);
      document.getElementById("Timer").innerHTML = "EXPIRED";
    }
  }, 1000);
}