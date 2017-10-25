import React from "react";

function onMessage(e) {
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

var new_uri = "wss://socket.etherscan.io/wshandler";

var reconnectionPeriod = 100,
	live = true;

function connect() {
	var ws = new WebSocket(new_uri);
	ws.onopen = function() {
		console.log("Websocket connected");
		ws.send(
			JSON.stringify({
				event: "txlist",
				address: "0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5"
			})
		);
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

connect();

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: `"event": "txlist", "address": "0x2a65aca4d5fc5b5c859090a6c34d164135398226"`
		};
	}

	render() {
		return (
			<div>
				<h1>hi</h1>
			</div>
		);
	}
}

export default HomePage;
