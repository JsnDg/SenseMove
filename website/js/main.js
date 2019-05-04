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
});

function startMeasure() {
  if (state == 0) {
    var motionType = document.getElementById("motion").value;
    switch (motionType) {
      case "0":
        console.log("Error: No motion type is selected.");
        break;
      case "1":
        console.log("Start standing measurement");
        state = 1;
        break;
      case "2":
        console.log("Start walking measurement");
        state = 2;
        break;
      case "3":
        console.log("Start running measurement");
        state = 3;
        break;
    }
  } else {
    console.log("Error: The measurement is in process.");
    console.log(state);
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
