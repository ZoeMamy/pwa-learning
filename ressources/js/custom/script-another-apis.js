/**
 * Battery
 */

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


/**
 * Vibrate
 */
function vibrateDevice() {
  var hasVibrated = window.navigator.vibrate(250) // vibrate for 250ms
  if (Modernizr.vibrate && hasVibrated) {
    console.debug('Vibrate is supported')
  } else {
    var msg = "Vibrate API is not supported in this device"
    console.warn(msg)
    alert(msg)
  }
}