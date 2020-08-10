/*******************************************************************************
/
/			Copyright 2016, James Powell. Pop box v1.0.0
/			A simple email handler using Nupp object storage.
/
*******************************************************************************/


// Require Required

var http = require('http'),
	fs = require('fs'),
	request = require('request');

// Some globals and settings

// end of globals and settings


http.createServer( function(req, res) {
	if (req.url == "/api/mailbox/mime" && req.method.toLowerCase() == "post") {
		var key = randomGen(20);
		req.on('data', function(chunk) {
			fs.createWriteStream(key + '.json', {'flags': 'a'}).write(chunk);
		}).on('end', function() {
			nuppbox(key);
			res.writeHead(200);
			res.write('Thank you');
			res.end();
		}).on('error', function(err) {
			console.log(err);
			res.writeHead(500);
			res.end();
		})
	} else {
		res.writeHead(200);
		res.write("hello");
		res.end();
	}
}).listen(process.env.PORT || 1998);

// Silently pass along data to Dropbox

function pushbox(name) {
	var file_url = name;
	var api_uri_i = "https://content.dropboxapi.com/1/files/auto/mailbox/mail.json"
	var opti = {
		url: api_uri_i,
		headers: {
			"Authorization": "Bearer P9bCD3UUVvoAAAAAAAAKMFGsSXThBmaPgqRDZEb8Fg5nm9O5U67rvdoucpHEzdZz"
		}
	}
	
	request.get(opti).on('data', function(data) {
		var t = '';
		t += data;
		jsonObj = JSON.parse(t);
		jsonObj["mail"].push(name);
		var api_uri = "https://content.dropboxapi.com/1/files_put/auto/mailbox/mail.json?overwrite=true";
	
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

// Generates an new key

function randomGen(n) {
		var stng = "";
		var alphabet = "ELjklmnostuvMNOPQRSTUpFGHIrabcdefghiwxyzABCDJKqVWXYZ";
		while (stng.length < n) {
			stng += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		}
		return stng;
}

function nuppbox(key) {
	
	var rest = fs.createReadStream(key + '.json');
	rest.on('data', function(data) {
		var t = '';
		t += data;
		var api_uri = "https://nupp.herokuapp.com/data";
		var opt = {
			url: api_uri,
			headers: {
				"Authorization": "Bearer P9bCD3UUVvoAAAAAAAAKMFGsSXThBmaPgqRDZEb8Fg5nm9O5U67rvdoucpHEzdZz"
			},
			body: t
		};
		request.post(opt, function(err, res, data) {
			if (!err) {
				var y = '';
				y += data;
				if (JSON.parse(data).key) {
					pushbox(JSON.parse(data).key);
				}
			} else {
				console.log(err);
			}
		});
	}).on('error', function(err) {
		console.log(err);
	});
}

