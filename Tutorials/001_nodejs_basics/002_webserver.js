var http = require('http');
http.createServer(function(req, res) {

  res.writeHead(200, {'Content-Type': 'text/html'});



	 var myNumber = 2;
	 var myOtherNumber = 2;

  res.end("Two Plus Two is equal to " + (myNumber+myOtherNumber));
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');