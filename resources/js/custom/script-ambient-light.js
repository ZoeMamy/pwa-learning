// Detect feature
if (Modernizr.ambientlight) {
    const msg = 'ambientlight is supported ;)'
    console.log(msg)
    $('#ambientlight-info').text(msg)
  } else {
    const msg = 'ambientlight is NOT supported :('
    console.log(msg)
    $('#ambientlight-info').text(msg)
    $('#my-ambientlight-container').hide()
  }

function readSensor() {
    const sensor = new AmbientLightSensor();
    sensor.onreading = () => {
        const msg = 'AmbientLightSensor:' + sensor.illuminance
        console.log(msg)
        $('#ambient-sensor').text(msg)
    }
    sensor.onerror = event => {
        console.log('AmbientLightSensor error', event.error.name, event.error.message);
    }
    sensor.start();
}