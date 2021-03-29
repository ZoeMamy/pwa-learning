var myMapInfo=document.getElementById("my-map-info"),provinceData={ab:{province:"Alberta",premier:"Jason Kenney",taxes:["GST 5%"]},bc:{province:"British Columbia",premier:"John Horgan",taxes:["PST 7%","GST 5%"]},mb:{province:"Manitoba",premier:"Brian Pallister",taxes:["PST 7%","GST 5%"]},nb:{province:"New Brunswick",premier:"Blaine Higgs",taxes:["HST 15%"]},nl:{province:"Newfoundland and Labrador",premier:"Andrew Furey",taxes:["HST 15%"]},nt:{province:"Northwest Territories",premier:"Caroline Cochrane",
taxes:["GST 5%"]},sc:{province:"Nova Scotia",premier:"Iain Rankin",taxes:["HST 15%"]},on:{province:"Ontario",premier:"Doug Ford",taxes:["HST 13%"]},nu:{province:"Nunavut",premier:"Joe Savikataaq",taxes:["GST 5%"]},pe:{province:"Prince Edward Island",premier:"Dennis King",taxes:["HST 15%"]},qc:{province:"Quebec",premier:"Fran\u00e7ois Legault",taxes:["PST 9.975%","GST 5%"]},sk:{province:"Saskatchewan",premier:"Scott Moe",taxes:["PST 6%","GST 5%"]},yt:{province:"Yukon",premier:"Sandy Silver",taxes:["GST 5%"]}},
attractionLinksPerAges={0:"Attraction link for new born to 5y-o",5:"Attraction link for 5y-o to 9y-o",10:"Attraction link for 10y-o to 14y-o",15:"Attraction link for 15y-o to 19y-o",20:"Attraction link for 20y-o to 24y-o",25:"Attraction link for 25y-o to 29y-o",30:"Attraction link for 30y-o to 34y-o",35:"Attraction link for 35y-o to 39y-o",40:"Attraction link for 40y-o to 44y-o",45:"Attraction link for 45y-o to 49y-o",50:"Attraction link for 50y-o to 59y-o",60:"Attraction link for 60y-o to 69y-o",
70:"Attraction link for 70y-o to 79y-o",80:"Attraction link for 80y-o to 89y-o",90:"Attraction link for 90y-o to 99y-o",100:"Attraction link for 100y-o and over"},computedInfo={province:"ab",age:"0",attrations:[]},shouldShowProvincesSelector=!1;hideComputedInfoForm();prepareProvincesList();
function getLocation(){navigator.geolocation?navigator.geolocation.getCurrentPosition(showPosition,showError):(shouldShowProvincesSelector=!0,showCustomInfoForm(),myMapInfo.innerHTML="Geolocation is not supported by this browser.")}
function showPosition(a){var b=a.coords.latitude;a=a.coords.longitude;var c=new google.maps.LatLng(b,a),d=document.getElementById("mapholder");d.style.height="300px";d.style.width="800px";d={center:c,zoom:14,mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!1,navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}};d=new google.maps.Map(document.getElementById("mapholder"),d);new google.maps.Marker({position:c,map:d,title:"You are here!"});b=getProvinceFromLatLong(b,a);console.log("getProvinceFromLatLong",
b);computedInfo.province=b;shouldShowProvincesSelector=!1;showCustomInfoForm()}
function getProvinceFromLatLong(a,b){var c={},d=new google.maps.LatLng(a,b);(new google.maps.Geocoder).geocode({latLng:d},function(f,h){if(h==google.maps.GeocoderStatus.OK)if(console.log("reverse geo coding",f),f[1]){console.log("found address",f[0].formatted_address);for(var e=0;e<f[0].address_components.length;e++)for(var g=0;g<f[0].address_components[e].types.length;g++)if("administrative_area_level_1"==f[0].address_components[e].types[g]){c=f[0].address_components[e];break}console.log("found city ",
c);computedInfo.province=c.short_name.toLowerCase()}else console.warn("No results found"),alert("No results found");else e="Geocoder failed due to: "+h,console.error(e),alert(e)})}
function showError(a){console.log("error",a);switch(a.code){case a.PERMISSION_DENIED:shouldShowProvincesSelector=!0;showCustomInfoForm();myMapInfo.innerHTML="User denied the request for Geolocation.";break;case a.POSITION_UNAVAILABLE:shouldShowProvincesSelector=!0;showCustomInfoForm();myMapInfo.innerHTML="Location information is unavailable.";break;case a.TIMEOUT:shouldShowProvincesSelector=!0;showCustomInfoForm();myMapInfo.innerHTML="The request to get user location timed out.";break;case a.UNKNOWN_ERROR:shouldShowProvincesSelector=
!0,showCustomInfoForm(),myMapInfo.innerHTML="An unknown error occurred."}}function showCustomInfoForm(){console.log("showCustomInfoForm");shouldShowProvincesSelector?$("#province-or-territory-row").show():$("#province-or-territory-row").hide();$("#custom-info").show()}function hideComputedInfoForm(){console.log("hideComputedInfoForm");$("#custom-info").hide()}function showComputedInfoForm(){console.log("showComputedInfoForm");prepareCumputedInfoBasedOnProvince();$("#computed-info").show()}
function prepareProvincesList(){console.log(provinceData);$.each(Object.keys(provinceData),function(a,b){console.log("append",a,b,provinceData[b]);$("#province-or-territory").append('<option value ="'+b+'">'+provinceData[b].province+"</option>")});$("#province-or-territory").change(function(){console.log("change provinde from select",$(this).val());computedInfo.province=$(this).val();showComputedInfoForm()})}
function prepareCumputedInfoBasedOnProvince(){var a=computedInfo.province;console.log("selectedProvince",a);$("#province").text(provinceData[a].province);$("#premier").text(provinceData[a].premier);$("#taxes").text(provinceData[a].taxes.join(", "));$("#age").text(computedInfo.age);a=getAttractionLinkFromAge(computedInfo.age);$("#attraction").text(a);$("#attraction").attr("href",a)}function handleChangedAge(a){console.log("Age has changed",a);computedInfo.age=a;showComputedInfoForm()}
function getAttractionLinkFromAge(a){a=a?1*a:0;var b=Object.keys(attractionLinksPerAges);if(0===a)return attractionLinksPerAges["0"];for(var c=0;c<b.length;c++)if(console.log("look up age key",c,b[c],attractionLinksPerAges[b[c]]),a<b[c])return attractionLinksPerAges[b[c-1]];return attractionLinksPerAges["100"]};