var getQueryParam = require('get-query-param')
var shoe = require('shoe')

function initialize() {
  var defaultLon = getQueryParam('lon', window.location.href)
  var defaultLat = getQueryParam('lat', window.location.href)
  var defaultGeo
  if (defaultLat && defaultLon) {
    defaultGeo = { lon: defaultLon, lat: defaultLat }
  } else {
    // As good of a place as any!
    defaultGeo = { lat: -25.363882, lng: 131.044922 }
  }

  var myLatlng = new google.maps.LatLng(defaultGeo.lat, defaultGeo.lon)
  var mapOptions = {
    zoom: 12,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'place-geo-marker',
      draggable: true
  });

  var stream = shoe('/whereami')

  google.maps.event.addListener(marker, 'dragend', function (event) {
    var geo = {
      lat: this.getPosition().lat(),
      lng: this.getPosition().lng()
    }
    stream.write(JSON.stringify(geo))
  })
}

google.maps.event.addDomListener(window, 'load', initialize)
