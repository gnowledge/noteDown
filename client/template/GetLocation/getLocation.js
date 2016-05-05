Template.getLocation.helpers({

  exampleMapOptions: function() {

  var a = _lat.get();
  var b = _lon.get();
  document.getElementById("textbox").value = "locations : "+ a + " : " + b ;  
  

  reverseGeocode.getLocation(a, b, function(location){   
    //location is straight output from Google
    //or you can now access it from reverseGeocode object
    //Session.set('location', reverseGeocode.getAddrStr());
    var c = reverseGeocode.getAddrStr();
    document.getElementById("txtlocation").value =c;
    Session.set('location', c);

  });

    
      // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
    // Map initialization options
      return {
        center: new google.maps.LatLng( a , b ),
        zoom: 18 
            };
    }
      },

  lat: function () { return _lat.get(); },
  lon: function () { return _lon.get(); } 
});

_lat = {
    current: 0,
    dep: new Deps.Dependency(),
    get: function(){
        this.dep.depend();
        return this.current;
    },
    set: function(value){
        this.current = value;
        this.dep.changed();
        return this.current;
    }
};

_lon = {
    current: 0,
    dep: new Deps.Dependency,
    get: function(){
        this.dep.depend();
        return this.current;
    },
    set: function(value){
      this.current = value;
        this.dep.changed();
        return this.current;
    }
};

if (navigator.geolocation){
    Meteor.setInterval(function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            _lat.set(position.coords.latitude);
            _lon.set(position.coords.longitude);
        }, showError);
    }, 5000);
} else {
    console.log("Geolocation is not supported by this browser.");
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}


Template.getLocation.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
      // Add a marker to the map once it's ready
        var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance
        });
    });
});


Template.getLocation.onRendered(function() {
    GoogleMaps.load();
});

