/*=======================================================================================================================
/
/											Main application
/						      					 Server
/
========================================================================================================================*/

// Require requirements
var http = require('http');
var fs = require('fs');
var path = require('path');
var routes = require('./routes');
var Handlebars = require('handlebars');
var url = require('url');
	
// Some global variables

global.api_v = "/api/v1/";

// Start server

http.createServer(function (req, res) {

	// Parse the url into components
	var parsed_url = url.parse(req.url.toLowerCase());
	if (parsed_url.query) {
		var query = {};
		var t = parsed_url.query.split('&');
		for (i in t) {
			var temp = t[i].split('=');
			t[i] = temp;
			query[t[i][0]] = t[i][1];
		} 

	} else {
		var query = {};
	}


	// To run the api
	if (parsed_url.pathname.slice(0, api_v.length).indexOf(api_v) > -1) { // "/api/v1"


		var routename = parsed_url.pathname.replace(api_v, '');
		if (routename[routename.length-1] == '/')
			routename[routename.length-1] = '';

		// Mapping routename to functions.
		switch (routename) {
			case 'route1':
				routes.route1(req, function(val, code) {
					res.writeHead(routes.xCODE(code, req), { 'Content-Type': 'application/json' });
					res.end(val, 'utf-8');
				});
				break;
			case 'route2':
				routes.route2(req, function(val, code) {
					res.writeHead(routes.xCODE(code, req), { 'Content-Type': 'application/json' });
					res.end(val, 'utf-8');
				});
				break;
			case 'user_info':
				routes.user_info(req, function(val, code) {
					res.writeHead(routes.xCODE(code, req), { 'Content-Type': 'text/html' });
					res.end(val, 'utf-8');
				});
				break;
			default:
				var writeDown = function(content) {
					res.writeHead(routes.xCODE(404, req), { 'Content-Type': 'text/html' });
					res.end(content, 'utf-8');
				}
				routes.x404(writeDown);
				break;
		}



	} else if (parsed_url.pathname.slice(0, '/static'.length).indexOf('/static') > -1) { // To serve static files


	    var filePath = '.' + parsed_url.pathname;
	    if (filePath[filePath.length - 1] == '/') {
	        filePath += 'index.html';
	    } else if (req.url.indexOf('.') > -1) {
	    	filePath += '';
	    } else {
	    	filePath += '/index.html';
	    }


	    var extname = path.extname(filePath);
	    var contentType = 'text/html';


	    switch (extname) {
	        case '.js':
	            contentType = 'text/javascript';
	            break;
	        case '.css':
	            contentType = 'text/css';
	            break;
	        case '.json':
	            contentType = 'application/json';
	            break;
	        case '.png':
	            contentType = 'image/png';
	            break;      
	        case '.jpg':
	            contentType = 'image/jpg';
	            break;
	        case '.wav':
	            contentType = 'audio/wav';
	            break;
	    }


	    fs.readFile(filePath, function(error, content) {
	        if (error) {
	            var writeDown = function(content) {
					res.writeHead(routes.xCODE(404, req), { 'Content-Type': 'text/html' });
					res.end(content, 'utf-8');
				}
				routes.x404(writeDown);
	        }
	        else {
	            res.writeHead(routes.xCODE(200, req), { 'Content-Type': contentType });
	            res.end(content, 'utf-8');
	        }
	    });


	} else if (parsed_url.pathname.slice(0, '/static'.length).indexOf('/static') == -1) { // Template routes


		var routename = parsed_url.pathname;

		switch (routename) { // Switching through template renderer
			case '/':
				compile_template('./templates/index.hbt', function (tem, err) {
					routes.index1(req, function (context, err_code) { // The route for this must always return a context
						var result = tem(context);  // Error handling ???
						res.writeHead(routes.xCODE(err_code, req), { 'Content-Type': 'text/html'});
						res.end(result, 'utf-8');
					});
				});
				break;
			default:
				var writeDown = function(content) {
					res.writeHead(routes.xCODE(200, req), { 'Content-Type': 'text/html' });
					res.end(content, 'utf-8');
				}
				routes.x404(writeDown);
				break;
		}
	

	} else {


		var writeDown = function(content) {
			res.writeHead(routes.xCODE(404, req), { 'Content-Type': 'text/html' });
			res.end(content, 'utf-8');
		}
		routes.x404(writeDown);


	}

}).listen(8080);

									// Template render
/*==================================================================================*/


function compile_template(filePath, callback) { // Renders the handlebar template.

	fs.readFile(filePath, function(error, content) {
		if (!error) {
			var source = '';
			source += content;
			var template = Handlebars.compile(source);
			callback(template, error);
		} else {
			callback("Error", error);
		}
	});

}

									// End Template render
/*==================================================================================*/