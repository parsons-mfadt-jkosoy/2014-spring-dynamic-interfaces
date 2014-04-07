Websockets
======================

Purpose
----------------------

- Realtime multiuser communication across the web.
- Supported in modern web browsers.

### Other options
- OSC. Useful for interactive installations that don't use web browsers.
- UDP. OSC is basically pretty UDP packets.
- TCP. Sends data a little differently than UDP. Slower but guarantees data gets there.

FWIW beginner to intermediate level never need anything more than OSC or Web Sockets.

### Advanced networking case studies

- [X-Wing vs Tie Fighter](http://www.gamasutra.com/view/feature/131781/the_internet_sucks_or_what_i_.php?print=1). Old school video game that created multiplayer networking back in the early days of the Internet.
- [Age of Empires](http://www.gamasutra.com/view/feature/3094/1500_archers_on_a_288_network_.php). Different game, similar challenges.

----------------------

WS
----------------------
Websocket library for NodeJS. This "wrapper" is allows for very basic communication with web sockets over NodeJS.

To install:


	npm install ws

This will automatically create a node_modules directory if it doesn't exist and download the ws library. We can now use it in our server.

	ws = require("ws");


Other Libraries
----------------------

- [Spacebrew](http://docs.spacebrew.cc/)
	- Great for interactive installations + web. Pretty great general purpose. Sort of it's own beast for the scope of our work today though.
- [Socket.io](http://socket.io/)
	- Web "polyfill", meaning 