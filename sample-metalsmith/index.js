// Require Requirements

// Metalsmith and plugins
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var Handlebars = require('handlebars');
var sass = require('metalsmith-sass');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');

// Other requirements
var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
	var filePath = './build' + req.url;
	    if (filePath[filePath.length - 1] == '/')
	        filePath += 'index.html';

	    var extname = path.extname(filePath);
	    var contentType = 'text/html';
	    switch (extname) {
	        case '.js':
	            contentType = 'text/javascript';
	            break;
	        case '.css':
	            contentType = 'text/css';
	            break;
	        case '.json':
	            contentType = 'application/json';
	            break;
	        case '.png':
	            contentType = 'image/png';
	            break;      
	        case '.jpg':
	            contentType = 'image/jpg';
	            break;
	        case '.wav':
	            contentType = 'audio/wav';
	            break;
	    }

	    fs.readFile(filePath, function(error, content) {
	        if (error) {
	            if(error.code == 'ENOENT'){
	                fs.readFile('./404.html', function(error, content) {
	                    res.writeHead(200, { 'Content-Type': contentType });
	                    res.end(content, 'utf-8');
	                });
	            }
	            else {
	                res.writeHead(500);
	                res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
	                res.end(); 
	            }
	        }
	        else {
	            res.writeHead(200, { 'Content-Type': contentType });
	            res.end(content, 'utf-8');
	        }
	    });
}).listen(8080);
											
build_blog( function(err) {
	if (!err) {
		console.log('#=> Build Successful. ');
	} else {
		throw err;
	}
});
											// Metalsmith
/*=================================================================================================*/

function build_blog(callback) {

	// Custom Helpers

	Metalsmith(__dirname)
	  .use(collections( {
	  	pages: {
	  		pattern: 'content/pages/*.md'
	  	},
	  	posts: {
	  		pattern: 'content/posts/*.md',
	  		sortBy: 'date',
	  		reverse: true
	  	}
	  }))
	  .use(markdown())
	  .use(permalinks({
	  	pattern: ':collection:title'
	  }))
	  .use(templates('handlebars'))
	  .use(sass())
	  .build(function(err) {
	     callback(err);
	  });
}
		
											// End Metalsmith
/*=================================================================================================*/

