export function WrapperWS(address) {
	var ws = new WebSocket("wss://socket.etherscan.io/wshandler");
	var reconnectionPeriod = 100,
		live = true;

	ws.onopen = function() {
		console.log("Opening a connection...");
		console.log(address);
	};

	ws.onclose = function(e) {
		console.log("Disconnected, attempting reconnect...");
		setTimeout(function() {
			console.log("Reconnecting...");
			WrapperWS(address);
		}, reconnectionPeriod);
	};

	ws.onmessage = function(e) {
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
	};

	ws.addEventListener("message", function(e) {
		if (
			JSON.parse(e.data)["event"] == "welcome" ||
			JSON.parse(e.data)["event"] == "pong" ||
			JSON.parse(e.data)["event"] == "txlist"
		) {
			ws.send(
				JSON.stringify({
					event: "txlist",
					address: address
				})
			);

			console.log("Message from server: ", JSON.parse(e.data));
		} else {
			return;
		}
	});

	ws.onerror = function(evt) {
		console.log("ERR: " + evt.data);
	};
}
