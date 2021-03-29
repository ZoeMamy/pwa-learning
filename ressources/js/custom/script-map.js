/**
 * Main callings
 */
var myMap = document.getElementById("my-map");
var provinceData = {
    ab: {
        province: 'Alberta',
        premier: 'Jason Kenney',
        taxes: ['GST 5%']
    },
    bc: {
        province: 'British Columbia',
        premier: 'John Horgan',
        taxes: ['PST 7%', 'GST 5%']
    },
    mb: {
        province: 'Manitoba',
        premier: 'Brian Pallister',
        taxes: ['PST 7%', 'GST 5%']
    },
    nb: {
        province: 'New Brunswick',
        premier: 'Blaine Higgs',
        taxes: ['HST 15%']
    },
    nl: {
        province: 'Newfoundland and Labrador',
        premier: 'Andrew Furey',
        taxes: ['HST 15%']
    },
    nt: {
        province: 'Northwest Territories',
        premier: 'Caroline Cochrane',
        taxes: ['GST 5%']
    },
    sc: {
        province: 'Nova Scotia',
        premier: 'Iain Rankin',
        taxes: ['HST 15%']
    },
    on: {
        province: 'Ontario',
        premier: 'Doug Ford',
        taxes: ['HST 13%']
    },
    nu: {
        province: 'Nunavut',
        premier: 'Joe Savikataaq',
        taxes: ['GST 5%']
    },
    pe: {
        province: 'Prince Edward Island',
        premier: 'Dennis King',
        taxes: ['HST 15%']
    },
    qc: {
        province: 'Quebec',
        premier: 'François Legault',
        taxes: ['PST 9.975%', 'GST 5%']
    },
    sk: {
        province: 'Saskatchewan',
        premier: 'Scott Moe',
        taxes: ['PST 6%', 'GST 5%']
    },
    yt: {
        province: 'Yukon',
        premier: 'Sandy Silver',
        taxes: ['GST 5%']
    }
}

var attractionLinksPerAges = {
    0: 'link0',
    5: 'link1',
    10: 'link2',
    15: 'link3',
    20: 'link4',
    25: 'link5',
    30: 'link6',
    35: 'link7',
    40: 'link8',
    45: 'link9',
    50: 'link10',
    60: 'link11',
    70: 'link12',
    80: 'link13',
    90: 'link14',
    100: 'link15'
}

var computedInfo = { // provide default values
    province: 'ab',
    age: '',
    attrations: [],
}

hideComputedInfoForm()
prepareProvincesList()


/**
 * Methods
 */

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
    prepareCumputedInfoBasedOnProvince()
    $('#computed-info').show()
}

function prepareProvincesList() {
    console.log(provinceData)
    $.each(Object.keys(provinceData), function(i, item){
        console.log("append", i, item, provinceData[item])
        $('#province-or-territory').append('<option value ="' + item + '">' + provinceData[item].province + '</option>');
      });

      $( "#province-or-territory" ).change(function() {
        console.log('change provinde from select', $(this).val())
        computedInfo.province = $(this).val()
        showComputedInfoForm()
      });
}

function prepareCumputedInfoBasedOnProvince() {
    var selectedProvince = computedInfo.province
    $('#province').text(provinceData[selectedProvince].province)
    $('#premier').text(provinceData[selectedProvince].premier)
    $('#taxes').text(provinceData[selectedProvince].taxes.join(', '))
    $('#age').text(computedInfo.age)

    var attractionLink = getAttractionLinkFromAge(computedInfo.age)
    $('#attraction').text(attractionLink)
    $('#attraction').attr('href', attractionLink)
}

function handleChangedAge(value) {
    console.log("Age has changed", value)
    computedInfo.age = value
    showComputedInfoForm()
}

function getAttractionLinkFromAge(age) {
    var safeAge = !!age ? age * 1 : 0
    var existingAges = Object.keys(attractionLinksPerAges)

    for (var i = 0; i < existingAges.length; i++) {
        console.log('look up age key', i, existingAges[i], attractionLinksPerAges[existingAges[i]])
        if (safeAge <= existingAges[i]) {
            return attractionLinksPerAges[existingAges[i]];
        }
      }
}