#1.Media Query

@media (orientation: portrait) {
  h1 {
    color: #c7006e;
    font-size: 30px;
    border: 8px solid #F48FB1;
    background: #fbe2f0;
  }
  div.formcontainer {
    background-color: #FFCDD2;
    width: 80%;
    box-shadow: 10px 10px grey;
  }
  input[type=submit] {
    background-color: #000000;
    color: white;
  }
  input[type=reset] {
    background-color: #EF9A9A;
  }
  .extra {
    display: none;
  }
}

#2. Geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError); // shoError is an custom error handling
    } else {
        shouldShowProvincesSelector = true
        showCustomInfoForm()
        myMapInfo.innerHTML = "Geolocation is not supported by this browser.";
    }
}

#3. Fetch API
function fetchImage() {
    fetch('resources/image/progressive-web-app.jpg')
        .then(validateResponse)
        .then(readResponseAsBlob)
        .then(showImage)
        .catch(logError);
}

#4. Implementing Gestures with Hammer.js
var myElement2 = document.getElementById('hammer-panel-2');
var msgElement2 = document.getElementById('swipe-msg-swipe');
Hammer(myElement2).on('swiperight swipeleft', function (ev) {
    //   animate blok
    let option = {}
    if (ev.type === 'swiperight') {
        option = { 'margin-left': '30vw' }
    } else {
        option = { 'margin-left': '-30vw' }
    }
    $('#label-swipe').animate(option, 1000);
    let msg = ev.type + " detected";
    console.debug('Hammer', msg)
    msgElement2.textContent = msg
});

#5. Battery status API
try {
  navigator.getBattery().then(function (battery) {
    updateChargeInfo();
    updateLevelInfo();
    updateChargingInfo();
  
    battery.addEventListener('chargingchange', function () {
      updateChargeInfo();
      console.log('changing charge', battery)
    });
    function updateChargeInfo() {
      var msg = "Is battery charging: " + (battery.charging ? "Yes" : "No")
      var charing = document.getElementById('charing');
      console.log(msg);
      charing.textContent = msg
    }
  
    battery.addEventListener('levelchange', function () {
      updateLevelInfo();
    });
    function updateLevelInfo() {
      var msg = "Battery level: " + battery.level * 100 + "%"
      var level = document.getElementById('level');
      console.log(msg);
      level.textContent = msg
    }
  
    battery.addEventListener('chargingtimechange', function () {
      updateChargingInfo();
    });
    function updateChargingInfo() {
      var msg = "Battery charging time: " + battery.chargingTime + " seconds"
      var chargingtimechange = document.getElementById('chargingtimechange');
      console.log(msg);
      chargingtimechange.textContent = msg
    }
  });
} catch (error) {
  console.error(error)
  $("#msg-battery").text("The browser doesn't handle battery API")
}

#6. Vibration API
function vibrateDevice() {
  try {
    var hasVibrated = window.navigator.vibrate(250) // vibrate for 250ms
    if (Modernizr.vibrate && hasVibrated) {
      console.debug('Vibrate is supported')
    } else {
      const msg = "Vibrate API is not supported in this device"
      console.warn(msg)
      $("#msg-vibration").text(msg)
    }
  } catch (error) {
    const msg = "Vibrate API is not supported in this device"
      console.warn(msg)
      $("#msg-vibration").text(msg)
  }
}

#7. Html Progress bar
if (Modernizr.progressbar) {
    const msg = 'Progress is supported :)'
    console.log(msg)
    $('#progress-info').text(msg)
  } else {
    const msg = 'Progress is NOT supported :('
    console.log(msg)
    $('#progress-info').text(msg)
    $('#my-progress-container').hide()
  }

// Events
$("#progress-control").on("change", function() {
    console.log('progress-control has changed', $(this).val())
    $('#my-progress').val($(this).val())
 });

#8. & 9 Pointer lock & Canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var x = 50;
var y = 50;

function canvasDraw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f00";
  ctx.beginPath();
  ctx.arc(x, y, RADIUS, 0, degToRad(360), true);
  ctx.fill();
}

canvasDraw();

// pointer lock object forking for cross browser
canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

canvas.onclick = function() {
  canvas.requestPointerLock();
};

// pointer lock event listeners

// Hook pointer lock state change events for different browsers
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
  if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
    console.log('The pointer lock status is now locked');
    document.addEventListener("mousemove", updatePosition, false);
  } else {
    console.log('The pointer lock status is now unlocked');  
    document.removeEventListener("mousemove", updatePosition, false);
  }
}

#10. Html Dataset
// Detect feature
if (Modernizr.dataset) {
    const msg = 'dataset is supported ;)'
    console.log(msg)
    $('#dataset-info').text(msg)
  } else {
    const msg = 'dataset is NOT supported :('
    console.log(msg)
    $('#dataset-info').text(msg)
    $('#my-dataset-container').hide()
  }


function checkDataset() {
    const el = document.querySelector('#user')
    const value = JSON.stringify(el.dataset)
    console.log('checkDataset', value)
    $('#my-dataset').text(value)
}