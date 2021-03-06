/*=======================================================================================================================
/
/										The Routes Table.
/						      Everything gets piped in and piped out here.
/
========================================================================================================================*/
var app = require('./libs/index');
var fs = require('fs');

module.exports = {


	// The api routes
	route1: function(val1, callback) {
		app.route1(val1, function(val2, code) {
			callback(val2, code);
		});
	},
	route2: function(val1, callback) {
		app.route1(val1, function(val2, code) {
			callback(val2, code);
		});
	},
	user_info: function(val1, callback) { // user_info
		app.user_info(val1, function(val2, code) {
			callback(val2, code);
		});
	},
	comments: function(val1, callback) { // user_info
		app.comments(val1, function(val2, code) {
			callback(val2, code);
		});
	},



	// Template context routes
	index1: function(val1, callback) {
		app.index1(val1, function(val2, code) {
			callback(val2, code);
		});
	},



	// The hroutes
	xCODE: function(val, req) {
		var date = new Date();
		switch (val) {
			case 200:
				console.log("#=> 200 finished " + date.toISOString() + " URL#=" + req.url + " METHOD#=" + req.method.toLowerCase());
				return 200;
				break;
			case 404:
				console.log("#=> 404 error " + date.toISOString() + " URL#=" + req.url + " METHOD#=" + req.method.toLowerCase());
				return 404;
				break;
			case 502:
				console.log("#=> 502 error " + date.toISOString() + " URL#=" + req.url + " METHOD#=" + req.method.toLowerCase());
				return 502;
				break;
			case 500:
				console.log("#=> 500 error " + date.toISOString() + " URL#=" + req.url + " METHOD#=" + req.method.toLowerCase());
				return 500;
				break;
			default:
				console.log("#=> Plz impliment!!" + " URL#=" + req.url + " METHOD#=" + req.method.toLowerCase());
				return 404;
				break;
		}
	},
	x404: function(callback) { // Serve a default 404 page.
		fs.readFile('./static/404.html', function(error, content) {
			if(!error) {
				callback(content);
			} else {
				callback("404 not found");
			}
	    });
	}
};



						

