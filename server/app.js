var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
require('app-module-path').addPath(__dirname);

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

require('routes/admin/security')(app);
require('routes/admin/authors')(app);
require('routes/admin/poems')(app);
require('routes/admin/photos')(app);

var server = app.listen(3001, function(){
	var host = server.address().address;
  	var port = server.address().port;

  	console.log('Example app listening at http://%s:%s', host, port);
})