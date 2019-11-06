import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";

import { Nav, Col, Row } from "react-bootstrap";
import { Provider, connect } from "react-redux";

import Login from "./login";
import store from "./store";
import Timesheet from './timesheet';

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
          <hr />
        </Col>
      </div>
    </Row>
  );

  return (
    <Router>
			{header}
			<Session />
			<br />
			<Switch>
				<Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/timesheet" component={Timesheet} />
      </Switch>
    </Router>
  );
}

let Session = connect(({ session }) => ({ session }))(
  ({ session, dispatch }) => {
    function logout(ev) {
      ev.preventDefault();
      localStorage.removeItem("session");
      dispatch({
        type: "LOG_OUT"
      });
    }

    if (session) {
      return (
        <Nav style={{ float: "right" }}>
          <Nav.Item>
            <p className="text-light py-2">User: {session.user_name}</p>
          </Nav.Item>
          <Nav.Item>
            <a className="nav-link" href="#" onClick={logout}>
              Logout
            </a>
          </Nav.Item>
        </Nav>
      );
    } else {
      return '';
    }
  }
);
