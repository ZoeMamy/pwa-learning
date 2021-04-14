// Detect feature
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