var http = require('http');
var fs = require('fs');
var mime = require("mime");
var path = require("path");
var md5 = require('crypto-js/md5');

var server = http.createServer(function (req, res) {

	req.on('data', function (chunk) {
		var text = '';
		text += chunk;
		var input = parsePost(text);
		if (validateForm(input)) {
			sendToPoole(input);
		}
	});
	res.writeHead(200);
	res.end('Post recieved');
});

function sendToPoole(input) {
	var querystring = require('querystring');
	var request = require('request');

	var form = input;

	var formData = querystring.stringify(form);
	var contentLength = formData.length;

	request({
	    headers: {
	      'Content-Length': contentLength,
	      'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    uri: 'http://pooleapp.com/stash/a24ae7bd-789c-4d1a-9029-52143e68c798/',
	    body: formData,
	    method: 'POST'
	  }, function (err, res, body) {
	    console.log(err);
	});
}

function validateForm(input) {
	var glib = input['glib']; 
	var text = '';
	text += md5(glib);
	if (text == input['glibhash'] && input['honey'] == '' && input['glib'].length >= 2040) {
		console.log("success!");
		return true;
	}
	else {
		return false
	}
}

// parse input to json start of block
function parsePost(input) {
	var formfields = [];
	var start = 0;
	var end = [];
	for (var i=0; i<input.length; i++) {
		if (input[i] == '&') {
			end.push(i);
		}
	}
	for (var i=0; i<end.length;i++) {
		formfields.push(input.substring(start, end[i]));
		start = end[i] + 1;
	}
	formfields.push(input.substring(end[end.length-1]+1, input.length));
	return parseJason(formfields);
}
function parseJason(input) {
	var jsonO = {};
	var end = 0;
	for (var i in input) {
		for (var j=0; j<input[i].length; j++) {
			if (input[i][j] == '=') {
				end = j;
			}
		}
		jsonO[input[i].substring(0, end)] = input[i].substring(end+1, input[i].length);
	}
	return jsonO;
}
// end of block

console.log('Hello Princess!');
server.listen(8081);
//server.listen(process.env.PORT || 3000);