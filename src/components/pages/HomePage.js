import React from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import ethereum_address from "ethereum-address";
import Done from "material-ui-icons/Done";
import { greenA400 } from "material-ui/styles/colors";
import { WrapperWS } from "../../utils/ws";

const styles = {
	width: 500
};

class HomePage extends React.Component {
	state = {
		data: {
			address: "",
			subcribedAddress: []
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
		this.setState({ errors });
		if (!this.state.errors) {
			this.state.data.subcribedAddress = this.state.data.address;
			this.setState({
				data: {
					address: ""
				}
			});
		}
		console.log(this.state.data.subcribedAddress);
		WrapperWS(this.state.data.subcribedAddress);
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
				<h1>{this.state.data.subcribedAddress}</h1>
			</div>
		);
	}
}

HomePage.propTypes = {};

export default HomePage;
