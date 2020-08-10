/******************************************************************
/
/		This is a derivative work. Pipp version 1.0.0
/		Copyright 2016, James Powell.
/
******************************************************************/

// Require required

var http = require('http');

// Start server

http.createServer( function (req, res) {
	res.writeHead(200);
	res.write('Jackpot!');
	res.end();
}).listen(25);