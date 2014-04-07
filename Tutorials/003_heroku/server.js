var http = require("http"); // http server
var fs = require('fs'); // filesystem.
var path = require('path'); // used for traversing your OS.
var url = require('url'); // utility for URLs
var WebSocketServer = require('ws').Server // websocket server

// settings
var WWW_ROOT = "./www/";
var HTTP_HOST = "127.0.0.1";
var HTTP_PORT = process.env.PORT || 8080;

// http server

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

// jk: more advanced: https://npmjs.org/package/mime
var server = http.createServer(function(req,res) {
	var fileToLoad;

	if(req.url == "/") {
		fileToLoad = "index.html";
	}
	else {
		fileToLoad = url.parse(req.url).pathname.substr(1);
	}

	console.log("[HTTP] :: Loading :: " + WWW_ROOT + fileToLoad);

	var fileBytes;
	var httpStatusCode = 200;

	// check to make sure a file exists...
	fs.exists(WWW_ROOT + fileToLoad,function(doesItExist) {

		// if it doesn't exist lets make sure we load error404.html
		if(!doesItExist) {
			console.log("[HTTP] :: Error loading :: " + WWW_ROOT + fileToLoad);

			httpStatusCode = 404;
			fileToLoad = "error404.html";
		}

		var fileBytes = fs.readFileSync(WWW_ROOT + fileToLoad);

		var mimeType = mimeTypes[path.extname(fileToLoad).split(".")[1]]; // complicated, eh?

		res.writeHead(httpStatusCode,{'Content-type':mimeType});
		res.end(fileBytes);
	});
}).listen(HTTP_PORT);

// web sockets
var clients = [];
wss = new WebSocketServer({server: server});

wss.on('connection', function(ws) {
	console.log("[WS] :: A new websocket connection was made!");

	// add to our list of connections
	ws.id = "client_" + Date.now();
	ws.position = { x:50, y:50 };

	clients.push(ws);

    ws.on('message', function(message) {
    	var jsonMessage = JSON.parse(message);

    	// store the position as it's updated
    	if(jsonMessage["event"] == "update") {
    		this.position = jsonMessage["position"];
    	}

    	// forward on to everyone else
    	if(jsonMessage["event"] != "init") {
	    	broadcast(message, this);
    	}
    });

    ws.on('close', function() {
    	console.log("[WS] :: A websocket was closed.");

    	// remove from our list of connections
    	clients.splice(clients.indexOf(this), 1);

    	broadcast({ 
    		"event": "disconnected",
    		"id": this.id
    	}, this);
    })


    // tell this client about everyone else
	var existingClients = [];
	[].forEach.call(clients, function(client) {
		if(ws != client) {
			existingClients.push({ id: client.id, position: client.position });
		}
	});

	// tell our current client about all existing clients
	var message = { 
		"event": "init",
		"clients": existingClients,
		"id": ws.id,
		"position": ws.position
	};

	ws.send(JSON.stringify(message));

    // tell everyone else this client exists
    broadcast({
    	"event": "connected",
    	"id": ws.id,
    	"position": ws.position
    }, ws);
});

// utility function to send a message to every client but the originator.
function broadcast(data,source) {
	[].forEach.call(clients,function(ws) {
		if(ws.id != source.id) {
			ws.send(JSON.stringify(data));
		}
	});
}

console.log("Server started. Visit http://" + HTTP_HOST + ":" + HTTP_PORT + " in your browser to see it work.");
