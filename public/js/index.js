// HTML5 geolocation demo
// http://jsfiddle.net/cjus/EBVLz/
// http://maps.google.com/maps?q=18.77362+98.98803

var appobj = {};
(function(app) {
   var options = {
      enableHighAccuracy: true,
      maximumAge: 120000,
      timeout: 10000
   };

   app.init = function() {
      if (window.navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
      } else {
         alert('Your browser does not natively support geolocation.');
      }

   };

   function successCallback(position) {
   var output = gpsInfo(position);
   $("p.lead").prepend(output);
   $("#c").attr('href','http://maps.google.com/maps?q=' + position.coords.latitude + '+' + position.coords.longitude);
   getLegislators(position.coords.latitude,position.coords.longitude);
   }

   function gpsInfo(position){
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

   function getLegislators(lat, lon){
         $.get( '/district?lat='+lat+'&lon='+lon, function( data ) {
             $("#content .container").html(data);
          //$(".page-header h1").text(data.results[0].state_name + '-' +data.results[0].district);
          //$("p.lead").append('<br/><h2>Congressional Representative</h2><b>'+data.results[0].first_name + ' ' + data.results[0].last_name +'</b><br/>' +'Phone: <a href="tel:'+data.results[0].phone+'">'+data.results[0].phone+'</a>');
          //$("p.lead").append('<h2>Senators</h2>'+'<b>'+data.results[1].first_name + ' ' + data.results[1].last_name +'</b><br/>Phone: <a href="tel:'+data.results[1].phone+'">'+data.results[1].phone+'</a>'+'<br/><b>'+data.results[2].first_name + ' ' + data.results[2].last_name +'</b><br/>Phone: <a href="tel:'+data.results[2].phone+'">'+data.results[2].phone+'</a>' );
            });
    }

   function errorCallback(error) {
      switch (error.code) {
         case error.PERMISSION_DENIED:
            alert('You have denied access to your position.');
            break;
         case error.POSITION_UNAVAILABLE:
            alert('There was a problem getting your position.');
            break;
         case error.TIMEOUT:
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
            alert('The application has timed out attempting to get your location.');
            break;
      }
      alert(error.message);
   }

})(appobj);

appobj.init();


