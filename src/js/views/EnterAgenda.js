import React from "react";
import PropTypes from "prop-types";

export const EnterAgenda = props => {
	var inputAgenda = "";
	let changeInput = e => {
		inputAgenda = e.target.value;
	};
	let searchAgenda = () => {
		props.history.push("/" + inputAgenda);
	};
	return (
		<div>
			<input placeholder="Enter Agenda Name" onChange={changeInput}></input>
			<button onClick={searchAgenda}>Search</button>
		</div>
	);
};

EnterAgenda.propTypes = {
	history: PropTypes.any
};
