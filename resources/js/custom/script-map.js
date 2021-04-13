// Detect feature with modernizr ?
// if (Modernizr.geolocation) {
//     const msg = 'geolocation is supported :)'
//     console.log(msg)
//     $('#geolocation-info').text(msg)
//   } else {
//     const msg = 'geolocation is NOT supported :('
//     console.log(msg)
//     $('#geolocation-info').text(msg)
//     $('#my-geolocation-container').hide()
//   }

// Will use custom fallback
function showError(error) {
    console.log('error on MAP', error)
    switch (error.code) {
        case error.PERMISSION_DENIED:
            shouldShowProvincesSelector = true
            showCustomInfoForm()
            myMapInfo.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            shouldShowProvincesSelector = true
            showCustomInfoForm()
            myMapInfo.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            shouldShowProvincesSelector = true
            showCustomInfoForm()
            myMapInfo.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            shouldShowProvincesSelector = true
            showCustomInfoForm()
            myMapInfo.innerHTML = "An unknown error occurred."
            break;
        default:
            shouldShowProvincesSelector = true
            showCustomInfoForm()
            myMapInfo.innerHTML = "An unknown error occurred."
            break;
    }
}

/**
 * Main callings
 */
var myMapInfo = document.getElementById("my-map-info");

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
    0: 'Attraction link for new born to 5y-o',
    5: 'Attraction link for 5y-o to 9y-o',
    10: 'Attraction link for 10y-o to 14y-o',
    15: 'Attraction link for 15y-o to 19y-o',
    20: 'Attraction link for 20y-o to 24y-o',
    25: 'Attraction link for 25y-o to 29y-o',
    30: 'Attraction link for 30y-o to 34y-o',
    35: 'Attraction link for 35y-o to 39y-o',
    40: 'Attraction link for 40y-o to 44y-o',
    45: 'Attraction link for 45y-o to 49y-o',
    50: 'Attraction link for 50y-o to 59y-o',
    60: 'Attraction link for 60y-o to 69y-o',
    70: 'Attraction link for 70y-o to 79y-o',
    80: 'Attraction link for 80y-o to 89y-o',
    90: 'Attraction link for 90y-o to 99y-o',
    100: 'Attraction link for 100y-o and over',
}

var computedInfo = { // provide default values
    province: 'ab',
    age: '0',
    attrations: [],
}
var shouldShowProvincesSelector = false

hideComputedInfoForm()
prepareProvincesList()


/**
 * Methods
 */

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        shouldShowProvincesSelector = true
        showCustomInfoForm()
        myMapInfo.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var latlon = new google.maps.LatLng(lat, lon)
    var mapholder = document.getElementById('mapholder')
    mapholder.style.height = '300px';
    mapholder.style.width = '100%';

    var myOptions = {
        center: latlon, zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
    }

    var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
    var marker = new google.maps.Marker({ position: latlon, map: map, title: "You are here!" });

    // Get Province's name
    var provinceCode = getProvinceFromLatLong(lat, lon)
    console.log('getProvinceFromLatLong', provinceCode)
    computedInfo.province = provinceCode

    shouldShowProvincesSelector = false
    showCustomInfoForm()
}

function getProvinceFromLatLong(lat, lng) {
    var city = {}
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log('reverse geo coding', results)
            if (results[1]) {
                //formatted address
                console.log('found address', results[0].formatted_address)
                //find country name
                for (var i = 0; i < results[0].address_components.length; i++) {
                    for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                        // there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                            //this is the object you are looking for
                            city = results[0].address_components[i];
                            break;
                        }
                    }
                }
                //city data
                console.log('found city ', city)
                computedInfo.province = (city.short_name).toLowerCase()
            } else {
                const msg = "No results found"
                console.warn(msg);
                alert(msg)
            }
        } else {
            const msg = "Geocoder failed due to: " + status
            console.error(msg);
            alert(msg)
        }
    });
}

function showCustomInfoForm() {
    console.log('showCustomInfoForm')
    if (shouldShowProvincesSelector) {
        $('#province-or-territory-row').show()
    } else {
        $('#province-or-territory-row').hide()
    }
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
    $.each(Object.keys(provinceData), function (i, item) {
        console.log("append", i, item, provinceData[item])
        $('#province-or-territory').append('<option value ="' + item + '">' + provinceData[item].province + '</option>');
    });

    $("#province-or-territory").change(function () {
        console.log('change provinde from select', $(this).val())
        computedInfo.province = $(this).val()
        showComputedInfoForm()
    });
}

function prepareCumputedInfoBasedOnProvince() {
    var selectedProvince = computedInfo.province
    console.log('selectedProvince', selectedProvince)
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

    if (safeAge === 0) {
        return attractionLinksPerAges['0']
    }

    for (var i = 0; i < existingAges.length; i++) {
        console.log('look up age key', i, existingAges[i], attractionLinksPerAges[existingAges[i]])
        if (safeAge < existingAges[i]) {
            return attractionLinksPerAges[existingAges[i - 1]];
        }
    }
    return attractionLinksPerAges['100'] // over 100y-o
}