/*****************************************************************************************************
/
/					Copyright 2016, James Powell. Short - the node.js url shortner.
/					Released under the MIT license.
/
******************************************************************************************************/


// Require Requirements

var http = require('http'),
	fs = require('fs'),
	request = require('request');

// End requirements



// Some globals and settings

// End globals and settings


// Start he server

http.createServer( function(req, res) {

	if (req.url.indexOf('/') > -1 && req.url.indexOf('?u=') == -1 && req.url.replace('/', '') != '' && req.method.toLowerCase() == "get") {
		var id = req.url.replace('/', '');
		var api_uri_i = "https://content.dropboxapi.com/1/files/auto/shortner/url.json"
		var opti = {
			url: api_uri_i,
			headers: {
				"Authorization": "Bearer P9bCD3UUVvoAAAAAAAAKMFGsSXThBmaPgqRDZEb8Fg5nm9O5U67rvdoucpHEzdZz"
			}
		};
		request.get(opti).on('data', function(data) {
			var t = '';
			t += data;
			var jsonObj = JSON.parse(t);
			if (jsonObj["url"][id]) {
				res.writeHead(301, { Location: jsonObj["url"][id] });
				res.end();
			} else {
				res.writeHead(404);
				res.write("404 not found.");
				res.end();
			}
		}).on('error', function(err) {
			res.writeHead(502);
			console.log(err);
			res.write("write error");
			res.end();
		});
			
	} else if (req.url.indexOf("/?u=") > -1 && req.method.toLowerCase() == "get") {
		var uri = req.url.replace("/?u=", "");
		var id = randomGen(5);
		pushbox(id, uri);
		res.writeHead(200, {"Content-Type": "application/json"});
		var key = {};
		key.id = id;
		key.url = uri;
		res.write(JSON.stringify(key));
		res.end();
	} else {
		res.writeHead(404);
		res.write("404 not found.");
		res.end();
	}

}).listen( process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1" );




// Generates an new key

function randomGen(n) {
		var stng = "";
		var alphabet = "CNOPQR123ufghiwxyzABSTUpF456789IrabDJKqVWXYELjklmnovMcdestGHZ";
		while (stng.length < n) {
			stng += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		}
		return stng;
}



// Silently pass along data to Dropbox

function pushbox(id, uri) {
	var api_uri_i = "https://content.dropboxapi.com/1/files/auto/shortner/url.json"
	var opti = {
		url: api_uri_i,
		headers: {
			"Authorization": "Bearer P9bCD3UUVvoAAAAAAAAKMFGsSXThBmaPgqRDZEb8Fg5nm9O5U67rvdoucpHEzdZz"
		}
	}
	
	request.get(opti).on('data', function(data) {
		var t = '';
		t += data;
		var jsonObj = JSON.parse(t);
		jsonObj["url"][id] = uri;

		var api_uri = "https://content.dropboxapi.com/1/files_put/auto/shortner/url.json?overwrite=true";
	
		var opt = {
			url: api_uri,
			headers: {
				"Authorization": "Bearer P9bCD3UUVvoAAAAAAAAKMFGsSXThBmaPgqRDZEb8Fg5nm9O5U67rvdoucpHEzdZz"
			},
			body: JSON.stringify(jsonObj)
		};
		request.post(opt, function(err, res, data) {
			if (!err) {
				return true;
			} else {
				console.log(err);
				return false;
			}
		});
	}).on('error', function(err) {
		console.log(err);
	});

	
}

