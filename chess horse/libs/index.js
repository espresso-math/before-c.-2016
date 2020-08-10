
						// Routes Mapped functions
/*=========================================================================*/


module.exports.index1 = index1;
module.exports.user_info = user_info;
module.exports.comments = comments;


						// Main classes and process
/*=========================================================================*/

var formidable = require('formidable');
var low = require('lowdb');

function index1(req, callback) {
	var context = { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
    callback(context, 200);
}


function user_info(req, callback) {
	callback("<DOCTYPE html><html><head><title>Hello user</title></head><body><h1>All nodes are occupied</h1></body></html>", 200);
}


function comments(req, callback) {
		var form = formidable.IncomingForm();
		var form_json = form.parse(req);
		var form_data = {};

		// writes the fields to json object
		form.on('field', function (name, value) {
			form_data[name] = value;
		}).on('end', function () { // if the form submited correctly
			comment_db(form_data , function (val, err) {
				if (!err) {
					callback(val, 200);
				}
			});
			
		}).on('error', function (err) { // on error
			callback("not ok", 500);
		});
}


function comment_db(data, callback) {
	var db = low('comments.json');

	db.defaults({sessions: []}).value();
	db.get('sessions').push(data).value();
	callback(data["redirect_to"], false);
}