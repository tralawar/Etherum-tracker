export function WrapperWS(address) {
	var ws = new WebSocket("wss://socket.etherscan.io/wshandler");
	var reconnectionPeriod = 100,
		live = true,
		output = document.getElementById("address-info");

	ws.onopen = function() {
		console.log("Opening a connection...");
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

	setInterval(function() {
		ws.send(
			JSON.stringify({
				event: "ping"
			})
		);
	}, 20000);

	ws.addEventListener("message", function(e) {
		if (JSON.parse(e.data)["event"] === "welcome") {
			ws.send(
				JSON.stringify({
					event: "txlist",
					address: address
				})
			);
			console.log("Message from server: ", JSON.parse(e.data));
		}
	});

	ws.addEventListener("message", function(e) {
		if (JSON.parse(e.data)["event"] === "txlist") {
			var stats = JSON.parse(e.data);

			for (var i = 0; i < stats["result"].length; i++) {
				var utcSeconds = parseInt(
					JSON.stringify(stats["result"][i]["timeStamp"]).replace(/\"/g, ""),
					10
				);
				var timeStampDate = new Date(utcSeconds * 1000);
				var data = {
					value: JSON.stringify(
						(stats["result"][i]["value"] / 1000000000000000000).toFixed(18)
					).replace(/\"/g, ""),
					from: JSON.stringify(stats["result"][i]["from"]).replace(/\"/g, ""),
					txid: JSON.stringify(stats["result"][i]["hash"]).replace(/\"/g, ""),
					date: timeStampDate.toLocaleString([], {
						weekday: "short",
						hour: "2-digit",
						minute: "2-digit"
					})
				};

				var newTr = document.createElement("tr");
				newTr.innerHTML = `
				<tr>
					<td class="eth-value">${data.value}</td>
					<td class="eth-from"><a href="https://etherscan.io/address/${data.from}" target="_blank">${data.from}</a></td>
					<td class="eth-txid"><a href="https://etherscan.io/address/${data.txid}" target="_blank">${data.txid}</a></td>
					<td class="eth-date">${data.date}</td>
				</tr>
				`;
				output.insertBefore(newTr, output.firstChild);
			}
		}
	});

	ws.onerror = function(evt) {
		console.log("ERR: " + evt.data);
	};
}
