var fs = require('fs')
var http = require('http')
var opn = require('opn')
var shoe = require('shoe')

module.exports = function (defaultLngLat, cb) {
  defaultLngLat = defaultLngLat || { lat: -25.363882, lng: 131.044922 }
  var pos = defaultLngLat
  var port = 9691

  // Serve the static files.
  var server = http.createServer(function(req, res) {
    if (/bundle.js/.test(req.url)) {
      fs.createReadStream('bundle.js').pipe(res)
    } else {
      fs.createReadStream('map.html').pipe(res)
    }
  })

  server.listen(port, function() {
    opn('http://localhost:' + port + '?lon=' + defaultLngLat.lng + '&lat=' + defaultLngLat.lat)
  })

  var sock = shoe(function(stream) {
    stream.on('end', function() {
      server.close()
      cb(null, pos)
    })
    stream.on('close', function() {
      server.close()
      cb(null, pos)
    })
    stream.on('data', function(data) {
      pos = JSON.parse(data.toString())
    })
  })
  sock.install(server, '/whereami')
}

