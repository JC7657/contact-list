import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import ScrollToTop from "./component/scrollToTop";

import { Context } from "./store/appContext";
import injectContext from "./store/appContext";

import { Contacts } from "./views/Contacts.js";
import AddContact from "./views/AddContact.js";
import EditContact from "./views/EditContact";
import { EnterAgenda } from "./views/EnterAgenda";

export const Layout = () => {
	return (
		<div>
			<BrowserRouter>
				<div>
					<Switch>
						<Route exact path="/" component={EnterAgenda} />
						<Route exact path="/index.html" component={Contacts} />
						<Route exact path="/:agendaslug" component={Contacts} />
						<Route exact path="/contacts" component={Contacts} />
						<Route exact path="/:agendaslug/add" component={AddContact} />
						<Route exact path="/:agendaslug/edit/:id" component={EditContact} />
						<Route render={() => <h1 className="notfound">Not found!</h1>} />
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
