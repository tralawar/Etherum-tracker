import React from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import ethereum_address from "ethereum-address";
import Done from "material-ui-icons/Done";
import { greenA400 } from "material-ui/styles/colors";
import { WrapperWS } from "../../utils/ws";
import EthereumQRplugin from "ethereum-qr-code";

const styles = {
	width: 500
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
		errors: ""
	};

	handleChange = e => {
		this.setState({
			...this.state,
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});
		const errors = this.validate(this.state.data.address);
		this.setState({ errors });
	};

	handleBlur = e => {
		const errors = this.validate(this.state.data.address);
		this.setState({ errors });
	};

	onSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data.address);
		const currentAddress = this.state.data.address;
		this.setState({ errors });

		if (!this.state.errors) {
			this.setState({
				data: {
					subcribedAddress: currentAddress,
					address: ""
				}
			});
			console.log(this.state.data.subcribedAddress);
		}
		WrapperWS(this.state.data.subcribedAddress);
		qr.toCanvas(sendDetails, configDetails);
	};

	validate = data => {
		let errors = {};
		if (data.substring(0, 2) === "0x") {
			console.log("Valid ethereum address.");
		} else {
			errors = "Invalid Ethereum address.";
			return errors;
		}
	};

	render() {
		const { data, errors } = this.state;
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<TextField
						type="text"
						id="address"
						name="address"
						hintText="Enter Etherum Address"
						errorText={errors}
						floatingLabelText="Etherum Address"
						style={styles}
						value={data.address}
						onInput={this.handleChange}
						onBlur={this.handleBlur}
					/>
					{!errors && data.address !== "" && <Done color={greenA400} />}
					<br />
					<RaisedButton label="Submit" type="submit" />
				</form>
				{}
				<div id="qr-code" />
				<h1>{this.state.data.subcribedAddress}</h1>
			</div>
		);
	}
}

HomePage.propTypes = {};

export default HomePage;
