import React from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { getWorkers } from "./ajax";

let Workers = connect(({ workers }) => ({ workers }))(({ workers }) => {
  const session = JSON.parse(localStorage.getItem("session"));
  let workerList = [];
  if (workers.length < 1) {
    getWorkers(session.user_id);
  }

  if (workers.length) {
    workerList.push(
      <Row key="HeaderRow">
        <Col xs={3}>
          <b>Name</b>
        </Col>
        <Col xs={3}>
          <b>Email</b>
        </Col>
      </Row>
    );
    workers.forEach((element, index) => {
      workerList.push(
        <Row key={index} style={{ paddingBottom: "0.5em" }}>
          <Col xs={3}>{element.name}</Col>
          <Col xs={3}>{element.email}</Col>
          <Col xs={3}>
            <Button variant="outline-dark" size="sm">
              View Timesheets
            </Button>
          </Col>
        </Row>
      );
    });
  } else {
    workerList = (
      <span className="font-weight-light"> No Workers Available </span>
    );
  }

  return workerList;
});

class ManagerHome extends React.Component {
  constructor(props) {
    super(props);

    this.routeToPath = this.routeToPath.bind(this);
  }

  routeToPath(path) {
    this.props.history.push(path);
  }

  render() {
    const session = JSON.parse(localStorage.getItem("session"));
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
            <div style={{ float: "right" }}>
              <Button
                style={{ marginRight: "1em" }}
                variant="outline-primary"
                size="sm"
                onClick={() => this.routeToPath('/manager/jobs')}
              >
                View Jobs
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => this.routeToPath('/manager/newjob')}
              >
                Create a Job
              </Button>
            </div>
          </Col>
        </Row>
        <br />
        <label> Your Workers: </label>
        <Workers />
      </div>
    );
  }
}

export default withRouter(ManagerHome);
