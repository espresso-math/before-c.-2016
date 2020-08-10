/*================================*/
	// Require Requirements
var unirest = require('unirest');
var fs = require('fs');
var low = require('lowdb');

/*================================*/


function Rip() {
}

Rip.prototype.fetch = function(url, callback) {

	
	unirest.get(url)
		   .headers({
		   		'Connection': 'keep-alive',
		   		'Upgrade-Insecure-Requests': 1,
		   		'User-Agent': "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36 Vivaldi/1.2.490.43",
		   		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
		   		'DNT': 1,
		   		'Accept-Encoding': 'gzip, deflate, sdch',
		   		'Accept-Language': 'en-US,en;q=0.8'	
			})
		   .end( function(resp) {
		   	 callback(false, resp.body + '');
		   });

};

Rip.prototype.rip_data = function(html, callback) {
	var parsed = [];
	var flag = 1;
	while (html.indexOf('<tr class="trd">') > -1) {
		var start = html.indexOf('<tr class="trd">');
		var finish = html.indexOf('</tr>', start) + 5;
		if (start > -1 && finish > -1) {
			parsed.push(html.slice(start, finish));
			var t = html.slice(start, finish);
			var temp = '';
			temp = html.replace(t, '');
			html = temp;
		} else {
			flag == -1;
		}
	}
	callback(parsed);
};

Rip.prototype.write_to_db = function(data, callback) {
	var db = low('data.json');
	db.defaults({subdomain: []}).value();
	for (i in data) {
		while (data[i].indexOf('<') > -1) {
			var start = data[i].indexOf('<');
			var finish = data[i].indexOf('>', start) + 1;
			if (start > -1 && finish > -1) {
				var t = '';
				t = data[i].slice(start, finish);
				var temp = '';
				temp = data[i].replace(t, ' ');
				data[i] = temp;
			}
		}
		var splited = data[i].split(' ');
		var seond = [];
		for (j in splited) {
			if (splited[j] != "") {
				seond.push(splited[j]);
			}
		}
		db.get('subdomain').push(seond).value();
	}
	callback(false);
};

function call(uri) {
	var man = new Rip();
	man.fetch( uri, function(err, body) {
		if (!err) {
			man.rip_data(body, function(parsed) {
				if (parsed == []) {
					console.log('Yikes!');
				}
				console.log(uri);
				man.write_to_db(parsed, function(err) {
					if(err) {
						console.log(err);
					}
				});
			});
		} else {
			console.log(err);
		}
	});
}



for (var i = 601; i<=863; i++) {
	var base = "http://freedns.afraid.org/domain/registry/?page=";
	var uri = base + i + "&sort=5&q=";
	call(uri);
}