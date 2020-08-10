var request = require('request'),
	fs = require('fs');

for(var i=0; i<100000; i++) {
	get_rp();
}

function get_rp() {
	var data = "";
	var uri = "http://localhost:8080";

	request(uri, function (err, resp, body) {

		if (!err) {
			data += body.replace(/(\r\n|\n|\r)/gm,"\",\"");
			writeToFile(data);
		} else {
			
		}

	});
}

function writeToFile(data) {
	var prepend = "[\"";
	var suffix = "\"]";
	var data = prepend + data + suffix;
	var read = fs.readFileSync("noob.txt");
	fs.writeFileSync("noob.txt", read+data+"\n");

}



