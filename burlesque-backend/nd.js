/********************************************************************************
/	
/			Copyright 2016, James Powell. Burlesque Backend version 1.0.0 
/           Released under the MIT licence. Feel free to use, tweak and share.
/
********************************************************************************/



var formidable = require('formidable'), // for form handling
	http = require('http'),  // for server requests
	util = require('util'), // not entirely sure why I added this. might break something
	fs = require('fs'), // file stream
	sha256 = require('crypto-js/sha256'), // cryptography
	aes = require('crypto-js/aes'), // cryptography
	CryptoJs = require('crypto-js'),  // cryptography
	YAML = require('json2yaml'),  // json to yaml convertion
	md5 = require('crypto-js/md5'), // cryptography
	request = require('request'), // for fetching gravatars
	Github = require('github-api'),
	markdown = require('markdown').markdown; // for creating and accessing github resources.

// Some globals and settings (environment)

global.github_username = 'espresso-math'; // github username
global.github_password = 'jamesp0well';  // your github personal access token
global.gist_uri = 'http://espresso-math.github.io/therocketeers_resources/comments/burlesque.crypt'; // cdn for requesting database from gh-pages.
global.aes_key = 'baCTjl4JNZOttZ6b'; // your AES symmetric encryption key
global.github_repo = 'TheRocketeers';
global.github_resource = 'therocketeers_resources';

// end of globals and settings

http.createServer( function (req, res) {

	if (req.url == '/post_comment' && req.method.toLowerCase() == 'post') {

		console.log("POST request......")

		res.writeHead(200, {'content-type': 'text/plain'});
		var form = formidable.IncomingForm();
		var form_json = form.parse(req);
		var form_data = {};

		// writes the fields to json object
		form.on('field', function (name, value) {
			res.write(name+": "+value+"\n");
			form_data[name] = value;
		}).on('end', function () { // if the form submited correctly
			if (validateGlib(form_data)) {
				// the main thread begins here.
				if ( checkGlib(form_data) ) {
					res.write('verified')
					writeFileToDisk(form_data);
				} else {
					res.write("Liar. Liar.");
				}

			} else {
				res.write("failed for one reason or the other");
			}
			res.end();
		}).on('error', function (err) { // on error
			res.write(err);
			res.end();
		});

		return;

	} else if (req.url == '/get_comments.json') {
		res.writeHead(200, {'content-type': 'application/json'});
		var uri = gist_uri;

		request(uri, function (err, resp, body) {

			if (!err) {
				console.log("heard");
				var file = '';
				var bytes = aes.decrypt(body, aes_key).toString(CryptoJs.enc.Utf8);
				file += bytes;
				var prepend = "{\"sessions\": [";
				var suffix = "]}";
				res.write(prepend + file + suffix);
				res.end();
			} else {
				res.write("Github didnot respong.");
				res.end();
			}

		});
	} else if (req.url == '/get_comments.yaml') {
		res.writeHead(200, {'content-type': 'application/yaml'});
		var uri = gist_uri;

		request(uri, function (err, resp, body) {

			if (!err) {
				var file = '';
				var bytes = aes.decrypt(body, aes_key).toString(CryptoJs.enc.Utf8);
				file += bytes;
				var prepend = "{\"sessions\": [";
				var suffix = "]}";
				var jsonFile = JSON.parse(prepend + file + suffix);
				var data = YAML.stringify(jsonFile);
				res.write(data);
				res.end();
			} else {
				res.write("Github didnot respond.");
				res.end();
			}
		});

	} else if (req.method.toLowerCase() == 'get' && req.url[2] == 'g') { // gravatar server

		var hash = req.url.replace("/?g=", "");	// parse url
		var uri = gist_uri;

		request(uri, function (err, resp, body) {

			if (!err) {
				var file = '';
				var bytes = aes.decrypt(body, aes_key).toString(CryptoJs.enc.Utf8);
				file += bytes;
				var prepend = "{\"sessions\": [";
				var suffix = "]}";
				var jsonfile = prepend + file + suffix;
				var jsonObj = JSON.parse(jsonfile); // get burlesque.crypt and parse it
				var email = '';
				for (var comment in jsonObj['sessions']) { // check burlesque.crypt for email and hash it using md5
					
					if ( jsonObj['sessions'][comment]['email0'] == hash) {
						var e = '';
						e += md5(jsonObj['sessions'][comment]['email']);
						email = e;
					}

				}


				console.log("start " + hash + " end");

				var base_url = "http://www.gravatar.com/avatar/"; // make url
				var url = base_url + email + "?d=retro";

				var download = function(uri, filename, callback){
				  request.head(uri, function(err, res, body){
				    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
				  });
				};

				console.log(url);
				download( url, "file.png", function () {
					console.log("done");
					res.writeHead(200, {"content-type": "image/png"});
					var fileStream = fs.readFileSync("file.png");
			        res.write(fileStream);
			        res.end();
				});

					} else {
						res.write("Github didnot respond.");
						res.end();
					}
				});

	} else if (req.url == '/publish' && req.method.toLowerCase() == 'post') { // a webhook for submitting new posts

		res.writeHead(200);
		var form = formidable.IncomingForm();
		var form_json = form.parse(req);
		var form_data = '';

		// writes the fields to json object
		form.on('field', function (name, value) {
			res.write(name+": "+value+"\n");
			form_data = value;
		}).on('end', function () { // if the form submited correctly
			res.write("ok");
			res.end();
			fs.writeFileSync('post.json', form_data);
			writePostToDisk();
		}).on('error', function (err) { // on error
			res.write(err);
			res.end();
		});
		

	} else if (req.url == '/showfile') {
		res.writeHead(200);
		res.write(fs.readFileSync('post.json').toString());
		res.end();
	} else {

		res.writeHead(200, {'content-type': 'text/plain'});
		res.write("404. She's moved on, Jake. You should too.");
		res.end();

	}

}).listen(process.env.PORT || 8080);

// validates whether everything is filleout correctly
function validateGlib(comments) {
	if (comments['name'] != '' && comments['comment'] != '' ) {
		if (comments['glib'].length >= 2000 && comments['glibhash'] != '' && comments['honey'] == '') {
			var hash = sha256(comments['glib']);
			if (comments['glibhash'] == hash) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
}

// Let's write file to disk

function writeFileToDisk(comments) {

	comments['glib'] = 'safe';
	var id = '';
	var salt = '';
	id += sha256(randomGen()); // generates random number an hashs it using sha256 to generate a unique id.
	salt += randomGen(); // generates a random salt
	comments['_id'] = id;

	var email_hash = '';
	email_hash += sha256(salt+comments['email']);
	comments['email0'] = email_hash;
	var t = '';
	t += fs.readFileSync('glib.txt');
	fs.writeFileSync('glib.txt', t + comments['glibhash'] + "\n");

	var dt = new Date();
	var date = '';
	date += dt.toISOString(); // get date in ISO format eg. 2016-03-13T09:41:22.882Z
	comments['created'] = date;

	var md = comments['comment'].replace('<', '&lt;').replace('>', '&gt;');
	comments['comment'] = md;
	var data_to_write = JSON.stringify(comments);

	gistFetch(data_to_write);

	//console.log('Finished writing to disk');
}

function gistUpdate(addum, data) { // sync changes to github gist.


	// var file_data = fs.readFileSync('burlesque.crypt');
	var jsonfile = '';

	jsonfile += data;
	if(jsonfile != '' && addum != '') {
		jsonfile += ',';
	}
	jsonfile += addum;

	var bytes = aes.encrypt(jsonfile, aes_key);
	var encrypted = '';
	encrypted += bytes;

	var github = new Github({
		username: github_username,
		password: github_password,
		auth: "basic"
	});

	var repo = github.getRepo(github_username, "therocketeers_resources");

	var options = {
	  author: {name: 'Burlesque', email: 'self@burles.q'},
	  committer: {name: 'Comment System', email: 'comment@burles.q'},
	  encode: true // Whether to base64 encode the file. (default: true) 
	}

	var path = 'comments/burlesque.crypt';
	repo.write('gh-pages', path, encrypted, 'New comment posted', options, function(err) {
		if (!err) {
			console.log("Sync finished");
			return true
		} else {
			console.log(err);
			return false;
		}
	});

}

// Fetch comments from github

function gistFetch(data) { 

	var github = new Github({
		username: github_username,
		password: github_password,
		auth: "basic"
	});

	var repo = github.getRepo(github_username, 'therocketeers_resources');

	repo.read('gh-pages', 'comments/burlesque.crypt', function(err, repo_data) {
		if (!err) {
			var dat_adm = '';
			var gist_data_json = repo_data;
			var bytes = aes.decrypt(gist_data_json, aes_key).toString(CryptoJs.enc.Utf8);
			var plaintext = '';
			plaintext += bytes;
			dat_adm += plaintext;
			gistUpdate(dat_adm, data); // call gist update with data
			console.log("Fetch finished");
		} else {
			console.log(err);
		}
	});

}



// Generates random numbers

function randomGen () {
	var stng = "";
	var alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
	while (stng.length < 2048) {
		stng += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
	}
	return stng;
}


// check if the glibhash has been used before. Prevents form recorders.

function checkGlib(form) {

	var file_data = fs.readFileSync('glib.txt');
	var f = '';
	f += file_data
	var file_arr = f.split("\n");

	flag = -1;
	for (var i in file_arr) {
		if (file_arr[i] == form['glibhash']) {
			flag += 1;
		}
	}

	if (flag == -1) {
		return true;
	} else {
		return false;
	}

}

function populateGlib() {

	request(gist_uri, function (err, resp, body) {

			if (!err) {

				var file = '';
				var bytes = aes.decrypt(body, aes_key).toString(CryptoJs.enc.Utf8);
				file += bytes;
				var prepend = "{\"sessions\": [";
				var suffix = "]}";
				var jsonfile = JSON.parse(prepend + file + suffix);
				for (var i in jsonfile['sessions']) {
					var t = '';
					t += fs.readFileSync('glib.txt');
					fs.writeFileSync('glib.txt', t + jsonfile['sessions'][i]['glibhash'] + "\n");
				}
				
			} else {
				console.log("did not respond");
			}

	});
}

populateGlib();

function writePostToDisk() {
	var read_file = fs.readFileSync('post.json');
	var jsonObj = JSON.parse(read_file);

	var message = "---\nlayout: post\ncategories: [blog]\nshare: true\ndate: " + jsonObj['created_at'] + "\ntitle: " + jsonObj['name'] + "\ncomment: true" + "\n---\n" + jsonObj['content'];
	var d = new Date();
	var data_head = d.getFullYear() + '-' + ("0" + d.getMonth()).slice(-2) + '-' + ("0" + d.getDay()).slice(-2) + '-' + jsonObj['name'].toLowerCase().split(' ').join('-') + '.md';

	
	if (message != '') {

		addNewPost(message, data_head);

	}
}

function addNewPost(message, data_head) { // write new post to github

	var github = new Github({
		username: github_username,
		password: github_password,
		auth: "basic"
	});

	var repo = github.getRepo(github_username, github_repo);

	var options = {
	  author: {name: 'Burlesque', email: 'self@burles.q'},
	  committer: {name: 'Webhook Url', email: 'webhook@burles.q'},
	  encode: true // Whether to base64 encode the file. (default: true) 
	}

	var path = '_posts/unclassified/' + data_head;
	repo.write('master', path, message, 'Published with Webhook url', options, function(err) {
		if (err) {
			console.log(err);
		}
	});

}


