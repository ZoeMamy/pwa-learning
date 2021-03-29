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
    var levchargingtimechangeel = document.getElementById('chargingtimechange');
    console.log(msg);
    chargingtimechange.textContent = msg
  }
});