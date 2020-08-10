/*================================*/
	// Require Requirements
var unirest = require('unirest');
var fs = require('fs');
var low = require('lowdb');

/*================================*/


var db = low('data_public.json');
db.defaults({public: []}).value();
var subd = db.get('public').value();

var new_db = low('data_short.json');
new_db.defaults({short: []}).value();

for (var j=1; j<=10; j++) {
	for (i in subd) {
		if (subd[i][0].replace('.', '').length < j) {
			var read = fs.readFileSync("noob.txt");
			fs.writeFileSync("noob.txt", read + subd[i][0] + "\n");
		}
	}
}
