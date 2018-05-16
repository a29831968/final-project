const express = require('express')
const app = express()
const port = 10065

app.listen(port)
app.use(express.static(__dirname + ''))

var district;
app.get("/ajax_data", function(req, res) {
  district=req.query.district;
  res.send(district)
  res.render( 'test.html', { district:district } );
})

app.get("/test", function(req, res) {
  res.send(district)
})
