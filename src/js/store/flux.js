const getState = ({ getStore, setStore }) => {
	return {
		store: {
			agenda: "",
			contacts: []
		},
		actions: {
			getList: url => {
				fetch(url)
					.then(resp => {
						// eslint-disable-next-line no-console
						console.log(resp);
						return resp.json();
					})
					.then(data => {
						setStore({
							contacts: data
						});
						return data;
					})
					.then(
						setTimeout(() => {
							// eslint-disable-next-line no-console
							console.log(getStore().contacts);
						}, 2000)
					);
			},
			setNewContact: (fullname, email, phone, address) => {
				setStore({
					newContact: {
						full_name: fullname,
						email: email,
						agenda_slug: getStore().agenda,
						phone: phone,
						address: address
					}
				});
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					body: JSON.stringify(getStore().newContact),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(resp => {
					// eslint-disable-next-line no-console
					console.log(resp);
					if (resp.status === 200) {
						// eslint-disable-next-line no-console
						console.log("Usuario creado con éxito");
						getStore().contacts.push(getStore().newContact);
						window.location.replace("/" + window.location.pathname.split("/")[1]);
					}
				});
			},
			editContact: (fullname, email, phone, address, id) => {
				let editContact = {
					full_name: fullname,
					email: email,
					agenda_slug: getStore().agenda,
					phone: phone,
					address: address
				};
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "PUT",
					body: JSON.stringify(editContact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						// eslint-disable-next-line no-console
						console.log(resp);
						if (resp.status === 200) {
							window.location.replace("/" + window.location.pathname.split("/")[1]);
						}
						return resp.json();
					}) // eslint-disable-next-line no-console
					.then(data => console.log(data));
			},
			deleteContact: id => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "DELETE"
				}) // eslint-disable-next-line no-console
					.then(resp => {
						// eslint-disable-next-line no-console
						console.log(resp);
						if (resp.status === 200) {
							// eslint-disable-next-line no-console
							console.log("User Deleted");
							window.location.reload();
						}
					});
			},
			saveCurrentAgenda: () => {
				setStore({
					agenda: window.location.pathname.split("/")[1]
				});
			}
		}
	};
};

export default getState;
