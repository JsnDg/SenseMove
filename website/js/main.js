//state = 0 no measure process is going on
//state = 1 stand motion type
//state = 2 walk motion type
//state = 3 run motion type
//state = 4 stand pause
//state = 5 walk pause
//state = 6 run pause

var state = 0;
var stand = 0;
var walk = 0;
var run = 0;
var countDown = 180*1000;

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
        Clock.start();
        break;
      case "2":
        console.log("Start walking measurement");
        state = 2;
        Clock.start();
        break;
      case "3":
        console.log("Start running measurement");
        state = 3;
        Clock.start();
        break;
    }
  }
  else if (state == 4) {
    console.log("Resume standing measurement");
    state = 1;
    Clock.resume();
  }
  else if (state == 5) {
    console.log("Resume walking measurement");
    state = 2;
    Clock.resume();
  }
  else if (state == 6) {
    console.log("Resume running measurement");
    state = 3;
    Clock.resume();
  }
  else {
    console.log("Error: The measurement is in process.");
    console.log(state);
  }
}

function pauseMeasure() {
  if (state == 1) {
    console.log("Pause standing measurement");
    state = 4;
    Clock.pause();
  }
  else if (state == 2) {
    console.log("Pause walking measurement");
    state = 5;
    Clock.pause();
  }
  else if (state == 3) {
    console.log("Pause running measurement");
    state = 6;
    Clock.pause();
  }
  else {
    console.log("Not started, can't pause");
    console.log(state);
    Clock.pause();
  }
}

function finishMeasure() {
  if (state == 0) {
    console.log("Not started, can't finish");
  }
  else {
    console.log("Finish current measure process");
    state = 0;
    Clock.reset();
    Clock.pause();
  }
}

function generateMap() {
  console.log("Generate map");
}

var Clock = {
  start: function () {
    var self = this;
    this.interval = setInterval(function () {
      var minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((countDown % (1000 * 60)) / 1000);
      if (countDown >= 0) {
        document.getElementById("Timer").innerHTML = minutes + "min " + seconds + "sec ";
      }
      else {
        document.getElementById("Timer").innerHTML = "Timeout"
      }
      countDown -= 1000
    }, 1000);
  },
  pause: function () {
    clearInterval(this.interval);
    delete this.interval;
  },
  resume: function () {
    if (!this.interval) this.start();
  },
  reset: function() {
    countDown = 180*1000;
  }
};