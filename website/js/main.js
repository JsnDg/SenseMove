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
//var countDown = 180 * 1000;
var countDown = 15 * 1000;
var timeout = 0;
var finishedType = "None";

$(document).ready(function() {
  var img = document.getElementById('foot');
  img.style.visibility = 'hidden';
  document.getElementById('version').onchange=version;
  $("#start").click(startMeasure);
  $("#pause").click(pauseMeasure);
  $("#finish").click(finishMeasure);
  $("#generate").click(generateMap);
});

function version() {
  var version = document.getElementById("version");
  if (version.value != "0") {
    document.getElementById("versionSelect").style.visibility = 'hidden';
  }
}

function startMeasure() {
  var versionType = document.getElementById("version").value;
  if (state == 0) {
    var motionType = document.getElementById("motion").value;
    if (motionType != "0" && versionType == "B") {
      var img = document.getElementById('foot');
      img.style.visibility = 'visible';
    }
    switch (motionType) {
      case "0":
        console.log("Error: No motion type is selected.");
        document.getElementById("instruction").innerHTML =
          "Error: No motion type is selected.";
        break;
      case "1":
        console.log("Start standing measurement");
        document.getElementById("instruction").innerHTML =
          "Start standing measurement. Click PAUSE to pause measurement.";
        state = 1;
        Clock.start();
        break;
      case "2":
        console.log("Start walking measurement");
        document.getElementById("instruction").innerHTML =
          "Start walking measurement. Click PAUSE to pause measurement.";
        state = 2;
        Clock.start();
        break;
      case "3":
        console.log("Start running measurement");
        document.getElementById("instruction").innerHTML =
          "Start running measurement. Click PAUSE to pause measurement.";
        state = 3;
        Clock.start();
        break;
    }
  } else if (state == 4) {
    if (versionType == "B") {
      var img = document.getElementById('foot');
      img.style.visibility = 'visible';
    }
    console.log("Resume standing measurement");
    document.getElementById("instruction").innerHTML =
      "Resume running measurement. Click PAUSE to pause measurement.";
    state = 1;
    Clock.resume();
  } else if (state == 5) {
    if (versionType == "B") {
      var img = document.getElementById('foot');
      img.style.visibility = 'visible';
    }
    console.log("Resume walking measurement");
    document.getElementById("instruction").innerHTML =
      "Resume walking measurement. Click PAUSE to pause measurement.";
    state = 2;
    Clock.resume();
  } else if (state == 6) {
    if (versionType == "B") {
      var img = document.getElementById('foot');
      img.style.visibility = 'visible';
    }
    console.log("Resume running measurement");
    document.getElementById("instruction").innerHTML =
      "Resume running measurement. Click PAUSE to pause measurement.";
    state = 3;
    Clock.resume();
  } else {
    console.log("Error: The measurement is in process.");
    document.getElementById("instruction").innerHTML =
      "Error: The measurement is in process.";
    console.log(state);
  }
}

function pauseMeasure() {
  var img = document.getElementById('foot');
  img.style.visibility = 'hidden';
  if (state == 1) {
    console.log("Pause standing measurement");
    document.getElementById("instruction").innerHTML =
      "Standing measurement is paused.";
    state = 4;
    Clock.pause();
  } else if (state == 2) {
    console.log("Pause walking measurement");
    document.getElementById("instruction").innerHTML =
      "Walking measurement is paused.";
    state = 5;
    Clock.pause();
  } else if (state == 3) {
    console.log("Pause running measurement");
    document.getElementById("instruction").innerHTML =
      "Running measurement is paused.";
    state = 6;
    Clock.pause();
  } else {
    console.log("Error: Not started, can't pause");
    document.getElementById("instruction").innerHTML =
      "Error: No measurement in process.";
    console.log(state);
    Clock.pause();
  }
}

function finishMeasure() {
  var img = document.getElementById('foot');
  img.style.visibility = 'hidden';
  if (state == 0) {
    console.log("Not started, can't finish");
    document.getElementById("instruction").innerHTML =
      "Error: No measurement in process.";
  } else {
    if (timeout == 0) {
      console.log("The measurement time is not enough.");
      document.getElementById("instruction").innerHTML =
        "The measurement time is not enough. The data will be discarded.";
      systemReset();
    } else {
      switch (state) {
        case 4:
          console.log("Finish standing measurement");
          document.getElementById("instruction").innerHTML =
            "The standing measurement is finished. Choose a new motion type and click START to start measurement.";
          stand = 1;
          systemReset();
          break;
        case 5:
          console.log("Finish walking measurement");
          document.getElementById("instruction").innerHTML =
            "The walking measurement is finished. Choose a new motion type and click START to start measurement.";
          walk = 1;
          systemReset();
          break;
        case 6:
          console.log("Finish running measurement");
          document.getElementById("instruction").innerHTML =
            "The running measurement is finished. Choose a new motion type and click START to start measurement.";
          run = 1;
          systemReset();
          break;
      }
    }
  }
}

function systemReset() {
  state = 0;
  Clock.reset();
  Clock.pause();
  if (stand + walk + run != 0) {
    finishedType = "";
    if (stand == 1) {
      finishedType = finishedType + "standing ";
    }
    if (walk == 1) {
      finishedType = finishedType + "walking ";
    }
    if (run == 1) {
      finishedType = finishedType + "run ";
    }
  }
  document.getElementById("typeFinished").innerHTML = finishedType;
  document.getElementById("Timer").innerHTML = "";
}

function generateMap() {
  if (stand + walk + run != 0) {
    console.log("Generate map");
    document.getElementById("instruction").innerHTML =
      "The pressure map is generated.";
  } else {
    console.log("Error: No measurement is finished. Map cannot be generated.");
    document.getElementById("instruction").innerHTML =
      "Error: No measurement is finished. Map cannot be generated. Please start a new measurement.";
  }
  systemReset();
}

var Clock = {
  start: function() {
    var self = this;
    this.interval = setInterval(function() {
      var minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((countDown % (1000 * 60)) / 1000);
      if (countDown >= 0) {
        document.getElementById("Timer").innerHTML =
          minutes + "min " + seconds + "sec ";
      } else {
        document.getElementById("Timer").innerHTML =
          "Timeout, you can pause and then finish the measurement.";
        timeout = 1;
        pauseMeasure();
      }
      countDown -= 1000;
    }, 1000);
  },
  pause: function() {
    clearInterval(this.interval);
    delete this.interval;
  },
  resume: function() {
    if (!this.interval) this.start();
  },
  reset: function() {
    //countDown = 180 * 1000;
    countDown = 15 * 1000;
  }
};
