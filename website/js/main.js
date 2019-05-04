//state = 0 no measure process is going on
//state = 1 stand motion type
//state = 2 walk motion type
//state = 3 run motion type

$(document).ready(function() {
  var state = 0;
  var stand = 0;
  var walk = 0;
  var run = 0;
  $("#start").click(startMeasure);
  $("#pause").click(pauseMeasure);
  $("#finish").click(finishMeasure);
  $("#generate").click(generateMap);
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
