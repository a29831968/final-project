const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const port = 10067;

app.listen(port);

const options = {
  ca: fs.readFileSync
}

app.use(express.static(__dirname + ''));
