import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router";

export default class WorkerHome extends React.Component {
  render() {
		const session = JSON.parse(localStorage.getItem('session'));
    return (
      <div>
        <h3>
          <span
            style={{
              color: "#515A5A"
            }}
          >
            Welcome {session.user_name}!
          </span>
        </h3>
        <br />
				<label> Your Timesheets </label>
      </div>
    );
  }
}
