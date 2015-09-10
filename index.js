var fs = require('fs')
var http = require('http')
var opn = require('opn')
var path = require('path')
var shoe = require('shoe')
var getport = require('getport')

module.exports = function (defaultLngLat, cb) {
  defaultLngLat = defaultLngLat || { lat: -25.363882, lng: 131.044922 }
  var pos = defaultLngLat

  getport(5000, 5999, function (err, port) {
    if (err) throw err
    else run(port)
  })

  function run (port) {
    // Serve the static files.
    var server = http.createServer(function(req, res) {
      if (/bundle.js/.test(req.url)) {
        fs.createReadStream(path.join(__dirname, 'bundle.js')).pipe(res)
      } else {
        fs.createReadStream(path.join(__dirname, 'map.html')).pipe(res)
      }
    })

    server.setTimeout(1000)

    server.listen(port, function() {
      opn('http://localhost:' + port
          + '?lon=' + defaultLngLat.lng
          + '&lat=' + defaultLngLat.lat)
    })

    var sock = shoe(function(stream) {
      function end() {
        server.close()
        cb(null, pos)
      }
      stream.on('end', end)
      stream.on('close', end)
      stream.on('data', function(data) {
        pos = JSON.parse(data.toString())
      })
    })
    sock.install(server, '/whereami')
  }
}

