import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";

import { Nav, Col, Row } from "react-bootstrap";
import { Provider, connect } from "react-redux";

import Login from "./login";
import store from "./store";
import Timesheet from './timesheet';
import NewJob from './newJob';
import WorkerHome from './workerhome';

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Index />
    </Provider>
  );
  ReactDOM.render(tree, root);
}

function Index(props) {
  const header = (
    <Row>
      <div className="header-container">
        <Col xs={12}>
          <h1>Timesheet App</h1>
          <Session />
          <hr />
        </Col>
      </div>
    </Row>
  );

  return (
    <Router>
			{header}
			<br />
			<Switch>
				<Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/timesheet" component={Timesheet} />
				<Route exact path="/newjob" component={NewJob} />
        <Route exact path="/worker/home" component={WorkerHome} />
      </Switch>
    </Router>
  );
}

let Session = connect(({session}) => ({session}))(({session, dispatch}) => {
  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem('session');
    dispatch({
      type: 'LOG_OUT',
    });
	}
	console.log(session);

    if (session) {
      const userName = session.user_name;
      const userType = session.user_type;
      return (
				<div style={{ display: 'inline-block', float: "right" }}>
					<Nav>
						<Nav.Item>
							<p className="text-dark py-2"> {userName} ({userType})</p>
						</Nav.Item>
						<Nav.Item>
							<a className="nav-link" href="#" onClick={logout}>
								Logout
							</a>
						</Nav.Item>
					</Nav>
				</div>
      );
    } else {
      return '';
    }
  }
);
