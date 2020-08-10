var request = require('request'),
	fs = require('fs');

for( var i = 3013644; i <= 3038000; i++) {
	get_rp(i);
}

function get_rp(regno) {
	var data = "";
	var uri = "http://results.itschool.gov.in/hse/hs1620spatxt_1/" + regno + ".txt";

	request(uri, function (err, resp, body) {

		if (!err) {
			data += body.replace(/(\r\n|\n|\r)/gm,"\",\"");
			if (data.indexOf("<html>") ==-1){
				writeToFile(data, regno);
				if (regno % 100===0){
					console.log(regno);
				}
			}
		} else {
			
		}

	});
}

function writeToFile(data, regno) {
	var prepend = "[\"";
	var suffix = "\"]";
	var data = prepend + data + suffix;
	var read = fs.readFileSync("noob.txt");
	fs.writeFileSync("noob.txt", read+data+"\n");

}



