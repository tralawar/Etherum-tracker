import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Done from "material-ui-icons/Done";
import { greenA400 } from "material-ui/styles/colors";
import { WrapperWS } from "../../utils/ws";
import EthereumQRplugin from "ethereum-qr-code";

const styles = {
	input: {
		width: 500
	},
	hint: {
		color: "rgba(230, 255, 253, 0.71)"
	},
	floatingLabelFocusStyle: {
		color: "c7c7c7"
	},
	tableStyle: {
		background:
			"-moz-linear-gradient(top,rgba(255, 255, 255, 0.11) 0%,rgba(255, 255, 255, 0) 100%)",
		background:
			"-webkit-linear-gradient(top,rgba(255, 255, 255, 0.11) 0%,rgba(255, 255, 255, 0) 100%)",
		background:
			"linear-gradient(to bottom,rgba(255, 255, 255, 0.11) 0%,rgba(255, 255, 255, 0) 100%)",
		filter:
			"progid:DXImageTransform.Microsoft.gradient(startColorstr='#1cffffff',endColorstr='#00ffffff',GradientType=0)"
	}
};

const qr = new EthereumQRplugin();

const sendDetails = {
	to: "0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8",
	value: 1,
	gas: 42000
};
const configDetails = {
	size: 180,
	selector: "#qr-code",
	options: {
		margin: 2
	}
};

class HomePage extends React.Component {
	state = {
		data: {
			address: "",
			subcribedAddress: ""
		},
		errors: "",
		table: false
	};

	handleChange = e => {
		this.setState({
			...this.state,
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});
		const errors = this.validate(this.state.data.address);
		this.setState({ errors });
	};

	handlePaste = e => {
		setTimeout(function() {
			document.getElementById("submit").focus();
		}, 0);
	};

	handleBlur = e => {
		const errors = this.validate(this.state.data.address);
		this.setState({ errors });
	};
	getStyle() {
		if (this.state.table) {
			return styles.tableStyle;
		}
	}
	onSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data.address);
		const currentAddress = this.state.data.address;
		this.setState({ errors });

		if (!this.state.errors) {
			WrapperWS(currentAddress);
			console.log("Subscribed to: ", currentAddress);
			this.setState({
				data: {
					subcribedAddress: currentAddress,
					address: ""
				},
				table: true
			});
		}

		qr.toCanvas(sendDetails, configDetails);
	};

	validate = data => {
		let errors = {};
		if (data.substring(0, 2) === "0x") {
			console.log("Valid ethereum address.");
		} else if (data === "") {
			return;
		} else {
			errors = "Invalid Ethereum address.";
			return errors;
		}
	};

	render() {
		const { data, errors, table } = this.state;
		return (
			<div className="body">
				<form onSubmit={this.onSubmit}>
					<TextField
						type="text"
						id="address"
						name="address"
						hintText="Etherum Address"
						hintStyle={styles.hint}
						errorText={errors}
						floatingLabelText="Enter Etherum Address"
						floatingLabelStyle={styles.floatingLabelStyle}
						style={styles.input}
						value={data.address}
						onInput={this.handleChange}
						onBlur={this.handleBlur}
						onPaste={this.handlePaste}
						spellCheck="false"
					/>
					{!errors && data.address !== "" && <Done color={greenA400} />}
					<br />
					<RaisedButton id="submit" label="Submit" type="submit" />
				</form>{" "}
				<br />
				<div id="qr-code" />
				<h2>{this.state.data.subcribedAddress}</h2>
				<table style={this.getStyle()}>
					{table && (
						<thead>
							<tr>
								<td className="eth-value header">Value</td>
								<td className="eth-from header">From</td>
								<td className="eth-txid header">TxHash</td>
								<td className="eth-date header">Time</td>
							</tr>
						</thead>
					)}
					<tbody id="address-info" />
				</table>
			</div>
		);
	}
}

export default HomePage;
