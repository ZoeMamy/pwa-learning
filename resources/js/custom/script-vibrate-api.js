/**
 * Vibrate
 */
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