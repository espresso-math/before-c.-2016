
						// Routes Mapped functions
/*=========================================================================*/


module.exports.mailgun = mailgun;
module.exports.mailbox = mailbox;



						// Main classes and process
/*=========================================================================*/
var formidable = require('formidable');
var low = require('lowdb');

// Some Global Variables

global.mail_spool = process.env.OPENSHIFT_DATA_DIR || 'data' + '/mailbox.json';

function randomGen (n) {
	var stng = "";
	var alphabet = "0123456789";
	while (stng.length < n) {
		stng += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
	}
	return stng;
}




/*===============CRUD*MAILBOX===============*/

// Create Mail

function mailgun(req, callback) {

		var form = formidable.IncomingForm();
		var form_json = form.parse(req);
		var form_data = {};

		// writes the fields to json object
		form.on('field', function (name, value) {
			form_data[name] = value;
		}).on('end', function () { // if the form submited correctly
			if (form_data["Received"]) {
				mailbox_db(form_data);
				callback("ok", 200);
			} else {
				callback("not ok", 500);
			}
			
		}).on('error', function (err) { // on error
			callback("not ok", 500);
		});
}

function mailbox_db (data) {
	var db = low(mail_spool);

	db.defaults({mail: []}).value();
	db.get('mail').push(data).value();
}

// Read Mail
function mailbox(req, callback) {
	var db = low(mail_spool);
	db.defaults({mail: []}).value();
	var mail = {};
	mail['mail'] = db.get('mail').value();
	callback(JSON.stringify(mail), 200);
}

// Update Mail

// Delete Mail


/*==========================================*/






/*================CRUD*User=================*/

function User(username, password) {
	this.username = username;
	this.password = password;
}

User.prototype.verify = function(callback) {
	var db = low('data/user.json');
	db.defaults({user: []}).value();
	var user = db.get('user').find({name: this.username, password: this.password}).value();
	if (user) {
		callback(user, false);
	} else {
		callback("not found", true);
	}
};

User.prototype.create_token = function(callback) {
	// body...
};

User.prototype.create = function (callback) {
	
};

User.prototype.read = function(callback) {
	this.verify( function(user, err) {
		if (!err) {
			callback( user, false);
		} else {
			callback( "not found", true);
		}
	})
};

User.prototype.update = function(callback) {
	// body...
};

User.prototype.delete = function(callback) {
	// body...
};

/*==========================================*/





















function books(req, callback) {

		var form = formidable.IncomingForm();
		var form_json = form.parse(req);
		var form_data = {};

		// writes the fields to json object
		form.on('field', function (name, value) {
			form_data[name] = value;
		}).on('end', function () { // if the form submited correctly
			book_db(form_data);
			callback(JSON.stringify(form_data), 200);
		}).on('error', function (err) { // on error
			callback("not ok", 500);
		});
}

function book_db(data) {
	var db = low('books.json');
	db.defaults({books: []}).value();

	if (data["category"]) {
		var cat = data["category"].split(',');
		data["category"] = cat;
		var aut = data["author"].split(',');
		data["author"] = aut;
		
		if (data["genre"]) {
			var gen = data["genre"].split(',');
			data["genre"] = gen;

			data["id"] = data["category"][0][0].toUpperCase() + data["category"][0][1].toUpperCase() + randomGen(6);

			db.get('books').push(data).value();
		}
	}
}