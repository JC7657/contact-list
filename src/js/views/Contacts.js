import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext";

export const Contacts = props => {
	const { store, actions } = useContext(Context);
	let pathUser = window.location.pathname.split("/")[1];
	let urlList = "https://assets.breatheco.de/apis/fake/contact/agenda/" + pathUser;

	useEffect(() => {
		actions.getList(urlList);
		actions.saveCurrentAgenda();
	}, []);

	let deleteContact = e => {
		let contactIndex = e.target.attributes.index.value;
		actions.deleteContact(store.contacts[contactIndex].id);
	};

	return (
		<div className="container">
			<div>
				<p
					onClick={() => props.history.push(pathUser + "/add")}
					className="btn btn-success btn-add text-right my-3">
					Add new contact
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.contacts.map((item, i) => {
							return (
								<ContactCard
									key={i}
									index={i}
									fullname={item.full_name}
									address={item.address}
									phone={item.phone}
									email={item.email}
									onClick={deleteContact}
								/>
							);
						})}
					</ul>
				</div>
			</div>
			<Modal />
		</div>
	);
};
//
Contacts.propTypes = {
	history: PropTypes.any
};
