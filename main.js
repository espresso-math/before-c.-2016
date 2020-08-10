function parsePost(input) {
	var formfields = [];
	var start = 0;
	var end = [];
	for (var i=0; i<input.length; i++) {
		if (input[i] == '&') {
			end.push(i);
		}
	}
	for (var i=0; i<end.length;i++) {
		formfields.push(input.substring(start, end[i]));
		start = end[i] + 1;
	}
	parseJason(formfields);
	console.log(formfields);
}
function parseJason(input) {
	var jsonO = {};
	var end = 0;
	for (var i in input) {
		for (var j=0; j<input[i].length; j++) {
			if (input[i][j] == '=') {
				end = j;
			}
		}
		jsonO[input[i].substring(0, end)] = input[i].substring(end+1, input[i].length);
	}
	console.log(jsonO);
}
parsePost("value1=this&valuea=lkfh&alfd=h&lk=afh");