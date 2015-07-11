var appobj = {};
(function (app) {
  var options = {
    enableHighAccuracy: true,
    maximumAge: 120000,
    timeout: 10000
  };

  app.init = function () {
    if (window.navigator.geolocation && location.pathname == '/') {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
    }
  };

  function successCallback(position) {
    var output = gpsInfo(position);
    output = "Finding Your Reps...";
    $("p.lead").prepend(output);
    getLegislators(position.coords.latitude, position.coords.longitude);
  }

  function gpsInfo(position) {
    var output = '';
    output += "Your position has been located.<br/><br/>";
    output += 'Latitude: ' + position.coords.latitude + "<br/>";
    output += 'Longitude: ' + position.coords.longitude + "<br/>";
    output += 'Accuracy: ' + position.coords.accuracy + " meters<br/>";
    if (position.coords.altitude)
      output += 'Altitude: ' + position.coords.altitude + " meters<br/>";
    if (position.coords.altitudeAccuracy)
      output += 'Altitude Accuracy: ' + position.coords.altitudeAccuracy + " meters<br/>";
    if (position.coords.heading)
      output += 'Heading: ' + position.coords.Heading + "<br/>";
    if (position.coords.speed)
      output += 'Speed: ' + position.coords.Speed + " m/s<br/>";
    output += 'Time of Position: ' + position.timestamp;
    output += '<br/><br/>';
    output += 'Map URL:';

    return output;

  }

  function getLegislators(lat, lon) {
    $.get('/district?lat=' + lat + '&lon=' + lon, function (data) {
      $("#content .container").html(data);
    });


  }


  function search(zip) {
    document.location.href = '/search/' + zip;
  }

  function errorCallback(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log('You have denied access to your position.');
        document.location.href = '/search';
        //      alert('You have denied access to your position.');
        break;
      case error.POSITION_UNAVAILABLE:
        console.log('There was a problem getting your position.');
        //      alert('There was a problem getting your position.');
        break;
      case error.TIMEOUT:
        console.log('Timeout');
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
        //    alert('The application has timed out attempting to get your location.');
        break;
    }
    //  alert(error.message);
  }





})(appobj);

appobj.init();
var map;
var infoWindow;
function getBoundaries(state, district) {
  $.get('/boundary?state=' + state.toLowerCase() + '&district=' + district, function (data) {

    initialize(data.coordinates[0]);

  });

}

function initialize(coords) {
  var district;
  var districtcoords = [];
  var bounds = new google.maps.LatLngBounds();
  for (i = 0; i < coords[0].length; i++) {
    districtcoords.push(new google.maps.LatLng(coords[0][i][1], coords[0][i][0]))
    bounds.extend(districtcoords[i]);
  }
  district = new google.maps.Polygon({
    paths: districtcoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  var mapOptions = {
    zoom: 9,
    draggable: false,
    center: bounds.getCenter(),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
  //var latlngbounds = new google.maps.LatLngBounds();
  //latlng.each(function(n){
  //   latlngbounds.extend(n);
  //});
  //map.setCenter(latlngbounds.getCenter());
  //map.fitBounds(latlngbounds); 
  district.setMap(map);
}

