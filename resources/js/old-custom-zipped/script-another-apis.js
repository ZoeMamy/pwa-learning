try{navigator.getBattery().then(function(a){function d(){var b="Is battery charging: "+(a.charging?"Yes":"No"),c=document.getElementById("charing");console.log(b);c.textContent=b}function e(){var b="Battery level: "+100*a.level+"%",c=document.getElementById("level");console.log(b);c.textContent=b}function f(){var b="Battery charging time: "+a.chargingTime+" seconds",c=document.getElementById("chargingtimechange");console.log(b);c.textContent=b}d();e();f();a.addEventListener("chargingchange",function(){d();
  console.log("changing charge",a)});a.addEventListener("levelchange",function(){e()});a.addEventListener("chargingtimechange",function(){f()})})}catch(a){console.error(a),$("#msg-battery").text("The browser doesn't handle battery API")}
  function vibrateDevice(){try{var a=window.navigator.vibrate(250);Modernizr.vibrate&&a?console.debug("Vibrate is supported"):(console.warn("Vibrate API is not supported in this device"),$("#msg-vibration").text("Vibrate API is not supported in this device"))}catch(d){console.warn("Vibrate API is not supported in this device"),$("#msg-vibration").text("Vibrate API is not supported in this device")}};
  