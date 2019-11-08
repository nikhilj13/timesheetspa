import React from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class WorkerHome extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.history.push("/worker/timesheet");
	}

  render() {
		const session = JSON.parse(localStorage.getItem('session'));
    return (
      <div>
				<Row>
					<Col xs={8}>
					<h3>
						<span
							style={{
								color: "#515A5A"
							}}
						>
							Welcome {session.user_name}!
						</span>
					</h3>
					</Col>
					<Col xs={4}>
					<div style={{ float: 'right' }}>
							<Button variant="outline-success" onClick={this.handleClick}>
								Submit a Timesheet
							</Button>
					</div>
					</Col>
				</Row>
        <br />
				<label> Your Timesheets </label>
				<br />
				<span className="font-weight-light"> No Timesheets Available </span>
      </div>
    );
  }
}

export default withRouter(WorkerHome);
