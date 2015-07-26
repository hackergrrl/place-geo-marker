# place-geo-marker

> Launch an interactive map to place a marker, and get a longitude/latitude back
> when the tab is closed.

# Install

```
npm install place-geo-marker
```

`place-geo-marker` is designed for use with Node, not in the browser. ([For now.](https://github.com/noffle/place-geo-marker/issues/1))


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


# How it Works

A woeful hack! `place-geo-marker` starts a local HTTP server on `localhost:9691`
and then launches your `$BROWSER` to that URL, serving some HTML and Javascript
that shows a Google Map with a draggable marker the default location.

Every time the user ends a drag operation, it sends that location along a
Websocket that is connected to the localhost server.

When the user is finished, they close the tab. This severs the Websocket
connection, informing the local HTTP server the location is finalized, which
kills the server and sends the final location in a callback to the original
caller.


# License

MIT
