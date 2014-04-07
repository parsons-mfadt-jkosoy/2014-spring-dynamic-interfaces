var socket = new WebSocket(document.URL.split("http").join("ws"));

var clients = [];

var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;

socket.addEventListener("open", function(evt) {
	console.log("[WS] :: Socket opened!");
});

socket.addEventListener("message", function(evt) {
	console.log("[WS] :: Message received!");

	var jsonMessage = JSON.parse(evt.data);

	// sometimes messages come back as a string twice for some reason.
	if(typeof jsonMessage == "string") {
		jsonMessage = JSON.parse(jsonMessage);
	}

	if(jsonMessage["event"] == "init") {
		var clients = jsonMessage["clients"];
		clients.forEach(function(client) {
			addClient(client);			
		});

		addClient(jsonMessage, true);
	}
	else if(jsonMessage["event"] == "connected") {
		addClient(jsonMessage, false);			
	}
	else if(jsonMessage["event"] == "update") {
		moveClient(jsonMessage, false);			
	}
	else if(jsonMessage["event"] == "disconnected") {
		removeClient(jsonMessage);
	}
})

//
function addClient(data, isMe) {
	var circle = document.createElement("div");
	circle.classList.add("is-circle"); // see css for how this then gets setup further
	circle.classList.add("is-client-id-" + data.id);

	if(isMe) {
		circle.classList.add("is-me");

		// listeners go here
		window.addEventListener("keydown", function(evt) {
			switch(evt.keyCode) {
				case KEY_UP:
					data.position.y -= 10;
					if(data.position.y <= 0) data.position.y = 0;
					moveClient({ position: data.position, id: data.id, event: "update" }, isMe);
				break;

				case KEY_DOWN:
					data.position.y += 10;
					if(data.position.y >= 280) data.position.y = 280;
					moveClient({ position: data.position, id: data.id, event: "update" }, isMe);
				break;

				case KEY_LEFT:
					data.position.x -= 10;
					if(data.position.x <= 0) data.position.x = 0;
					moveClient({ position: data.position, id: data.id, event: "update" }, isMe);
				break;

				case KEY_RIGHT:
					data.position.x += 10;
					if(data.position.x >= 280) data.position.x = 280;
					moveClient({ position: data.position, id: data.id, event: "update" }, isMe);
				break;
			}
		}, false);
	}

	document.getElementById("stage").appendChild(circle);

	moveClient(data, isMe);
}

function moveClient(data, isMe) {
	var circle = document.querySelector(".is-client-id-" + data.id);

	circle.style.left = data.position.x + "px";
	circle.style.top = data.position.y + "px";

	if(isMe) {
		socket.send(JSON.stringify(data));
	}
}

function removeClient(data) {
	var circle = document.querySelector(".is-client-id-" + data.id);

	if(circle && circle.parentNode) {
		circle.parentNode.removeChild(circle);
	}

	// find the client by id
	var index = -1;
	clients.forEach(function(client,idx) {
		if(index > -1) return;

		if(data.id == client.id) {
			index = idx;
		}
	});

	// if it exists remove it
	if(index > -1) {
		clients.splice(clients.indexOf(index), 1);
	}
}