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

function clearResult() {
    $('#my-dataset').text('')
}