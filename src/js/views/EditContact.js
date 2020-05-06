import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

class EditContact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			full_name: "",
			email: "",
			phone: "",
			address: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.EditContact = this.EditContact.bind(this);
		this.goBack = this.goBack.bind(this);
	}

	static contextType = Context;

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	EditContact() {
		const { actions } = this.context;
		actions.editContact(
			this.state.full_name,
			this.state.email,
			this.state.phone,
			this.state.address,
			window.location.pathname.split("/")[3]
		);
	}
	componentDidMount() {
		const { actions } = this.context;
		actions.saveCurrentAgenda();
		fetch("https://assets.breatheco.de/apis/fake/contact/" + window.location.pathname.split("/")[3])
			.then(resp => resp.json())
			.then(data => {
				this.setState({
					full_name: data.full_name,
					email: data.email,
					phone: data.phone,
					address: data.address
				});
			});
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
								value={this.state.full_name}
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
								value={this.state.email}
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
								value={this.state.phone}
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
								value={this.state.address}
							/>
						</div>
						<button onClick={this.EditContact} type="button" className="btn btn-primary form-control">
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

export default EditContact;
EditContact.propTypes = {
	history: PropTypes.any
};
