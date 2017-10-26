var new_uri = "wss://socket.etherscan.io/wshandler";

var reconnectionPeriod = 100,
	live = true;

export function onMessage(e) {
	if (!live) {
		return;
	}
	var data;
	try {
		data = JSON.parse(e.data);
		console.log(data);
	} catch (err) {
		console.error(err);
	}
}

export function connect(subcribedAddress) {
	var ws = new WebSocket(new_uri);
	ws.onopen = function() {
		console.log("Websocket connected");
	};
	ws.onmessage = onMessage;

	ws.onerror = function(e) {
		console.error(e);
	};
	ws.onclose = function(e) {
		console.log("Disconnected, attempting reconnect...");
		setTimeout(function() {
			console.log("Reconnecting...");
			connect();
		}, reconnectionPeriod);
	};
}

export function send(subcribedAddress) {
	var ws = new WebSocket(new_uri);
	ws.send(
		JSON.stringify({
			event: "txlist",
			address: subcribedAddress
		})
	);
}
