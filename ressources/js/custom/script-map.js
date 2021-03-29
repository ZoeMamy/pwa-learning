/**
 * Main callings
 */
var myMap = document.getElementById("my-map");
var provinceData = {
    ab: {
        province: 'Alberta',
        premier: 'XXX',
        taxes: ['Taxe info 1', 'Tax info 2']
    },
    bc: {
        province: 'British Columbia',
        premier: 'XXX',
        taxes: ['Taxe info 1', 'Tax info 2']
    },
    mb: {
        province: 'Manitoba',
        premier: 'XXX',
        taxes: ['Taxe info 1', 'Tax info 2']
    },
    nb: {
        province: 'New Brunswick',
        premier: 'XXX',
        taxes: ['Taxe info 1', 'Tax info 2']
    },
    nl: {
        province: 'Newfoundland and Labrador',
        premier: 'XXX',
        taxes: ['Taxe info 1', 'Tax info 2']
    },
    nt: {
        province: 'Northwest Territories',
        premier: 'XXX',
        taxes: ['Taxe info 1', 'Tax info 2']
    },
    sc: {
        province: 'Nova Scotia',
        premier: 'XXX',
        taxes: ['Taxe info 1', 'Tax info 2']
    },
    nu: {
        province: 'Nunavut',
        premier: 'XXX',
        taxes: ['Taxe info 1', 'Tax info 2']
    },
    pe: {
        province: 'Prince Edward Island',
        premier: 'XXX',
        taxes: ['Taxe info 1', 'Tax info 2']
    },
    qc: {
        province: 'Quebec',
        premier: 'XXX',
        taxes: ['Taxe info 1', 'Tax info 2']
    },
    sk: {
        province: 'Saskatchewan',
        premier: 'XXX',
        taxes: ['Taxe info 1', 'Tax info 2']
    },
    yt: {
        province: 'Yukon',
        premier: 'XXX',
        taxes: ['Taxe info 1', 'Tax info 2']
    }
}

var computedInfo = {
    province: '',
    age: '',
    attrations: [],
}

hideComputedInfoForm()
prepareProvincesList()


/**
 * Methods
 */
function prepareProvincesList() {
    console.log(provinceData)
    $.each(Object.keys(provinceData), function(i, item){
        console.log("append", i, item, provinceData[item])
        $('#province-or-territory').append('<option value ="' + item + '">' + provinceData[item].province + '</option>');
      });
}


function getLocation() {
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(showPosition, showError);
    // } else {
        showCustomInfoForm()
        myMap.innerHTML = "Geolocation is not supported by this browser.";
    // }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var latlon = new google.maps.LatLng(lat, lon)
    var mapholder = document.getElementById('mapholder')
    mapholder.style.height = '300px';
    mapholder.style.width = '500px';

    var myOptions = {
        center: latlon, zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
    }

    var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
    var marker = new google.maps.Marker({ position: latlon, map: map, title: "You are here!" });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            showCustomInfoForm()
            myMap.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            showCustomInfoForm()
            myMap.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            showCustomInfoForm()
            myMap.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            showCustomInfoForm()
            myMap.innerHTML = "An unknown error occurred."
            break;
    }
}


function showCustomInfoForm() {
    console.log('showCustomInfoForm')
    $('#custom-info').show()
}

function hideComputedInfoForm() {
    console.log('hideComputedInfoForm')
    $('#custom-info').hide()
}

function showComputedInfoForm() {
    console.log('showComputedInfoForm')
    $('#custom-info').show()
}

