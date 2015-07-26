# place-geo-marker

> Launch an interactive map to place a marker, and get a longitude/latitude back
> when the tab is closed.


# Install

```
npm install place-geo-marker
```


# Usage

```js
var placeGeoMarker = require('place-geo-marker')

var defaultMarkerPos = {
  lng: 37.3404253,
  lat: -121.8924441
}

placeGeoMarker(defaultMarkerPos, function(err, pos) {
  // 'pos' will be of the same structure as 'defaultMarkerPos'
  console.dir(pos)
})
```


# API

`place-geo-marker` exports a single function.

```js
var placeGeoMarker = require('place-geo-marker')
```

## placeGeoMarker(defaultPos, cb)

`defaultPos` is an object with populated `lng` and `lat` properties. If `null`,
a default will be provided.

`cb` is a callback function, with parameter one being an error (`null` if none),
and the parameter two being an object as above with `lng` and `lat` properties.


# License

MIT
