import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

class AddContact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			full_name: "",
			email: "",
			phone: "",
			address: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.addContact = this.addContact.bind(this);
		this.goBack = this.goBack.bind(this);
	}

	static contextType = Context;

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	addContact() {
		const { actions } = this.context;
		actions.setNewContact(this.state.full_name, this.state.email, this.state.phone, this.state.address);
	}
	componentDidMount() {
		const { actions } = this.context;
		actions.saveCurrentAgenda();
	}
	goBack() {
		const { store } = this.context;
		let agendaName = store.agenda;
		this.props.history.push("/" + agendaName);
	}

	render() {
		return (
			<div className="container">
				<div>
					<h1 className="text-center mt-5">Add a new contact</h1>
					<form>
						<div className="form-group">
							<label>Full Name</label>
							<input
								name="full_name"
								onChange={this.handleChange}
								type="text"
								className="form-control"
								placeholder="Full Name"
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input
								name="email"
								onChange={this.handleChange}
								type="email"
								className="form-control"
								placeholder="Enter email"
							/>
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input
								name="phone"
								onChange={this.handleChange}
								type="phone"
								className="form-control"
								placeholder="Enter phone"
							/>
						</div>
						<div className="form-group">
							<label>Address</label>
							<input
								name="address"
								onChange={this.handleChange}
								type="text"
								className="form-control"
								placeholder="Enter address"
							/>
						</div>
						<button onClick={this.addContact} type="button" className="btn btn-primary form-control">
							save
						</button>
						<span onClick={this.goBack} className="mt-3 w-100 text-center">
							or get back to contacts
						</span>
					</form>
				</div>
			</div>
		);
	}
}

export default AddContact;
AddContact.propTypes = {
	history: PropTypes.any
};
