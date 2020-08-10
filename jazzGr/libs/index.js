
						// Routes Mapped functions
/*=========================================================================*/


module.exports.index1 = index1;
module.exports.user_info = user_info;


						// Main classes and process
/*=========================================================================*/


function index1(req, callback) {
	var context = { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
    callback(context, 200);
}


function user_info(req, callback) {
	callback("<DOCTYPE html><html><head><title>Hello user</title></head><body><h1>All nodes are occupied</h1></body></html>", 200);
}