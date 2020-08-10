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
	
// Some global variables

global.api_v = "/api/v1/";

// Start server

http.createServer(function (req, res) {

	if (req.url.indexOf(api_v) > -1 && req.url.indexOf('/static/') == -1) { // The api routes


		var routename = req.url.replace(api_v, '');
		if (routename[routename.length-1] == '/')
			routename[routename.length-1] = '';

		// Mapping routename to functions.
		switch (routename) {
			case 'mailgun':
				routes.mailgun(req, function(val, code) {
					res.writeHead(routes.xCODE(code, req), { 'Content-Type': 'application/json' });
					res.end(val, 'utf-8');
				});
				break;
			case 'mailbox':
				routes.mailbox(req, function(val, code) {
					res.writeHead(routes.xCODE(code, req), { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
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



	} else if (req.url.indexOf(api_v) == -1 && req.url.indexOf('/static') > -1) { // Static file server


	    var filePath = '.' + req.url;
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


	} else if (req.url.indexOf('/static/' == -1)) { // Template routes


		var routename = req.url;

		switch (routename) { // Switching through template renderer
			case '/legacy':
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

}).listen( process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1" ); // Openshift needs this.

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