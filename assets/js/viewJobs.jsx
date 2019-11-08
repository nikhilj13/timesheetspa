import React from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { getJobs } from "./ajax";

let Jobs = connect(({ jobs }) => ({ jobs }))(({ jobs }) => {
  let jobList = [];
  if (jobs && jobs.length < 1) {
    getJobs();
  }

  if (jobs.length) {
    jobList.push(
      <Row key="HeaderRow">
        <Col xs={2}>
          <b>Job Code</b>
        </Col>
        <Col xs={2}>
          <b>Job Name</b>
        </Col>
				<Col xs={2}>
          <b>Budget</b>
        </Col>
				<Col xs={2}>
          <b>Description</b>
        </Col>
      </Row>
    );
    jobs.forEach((element, index) => {
      jobList.push(
        <Row key={index} style={{ paddingBottom: "0.5em" }}>
          <Col xs={2}>{element.job_code}</Col>
          <Col xs={2}>{element.name}</Col>
					<Col xs={2}>{element.budget}</Col>
          <Col xs={2}>{element.description}</Col>
        </Row>
      );
    });
  } else {
    jobList = (
      <span className="font-weight-light"> No Jobs Available </span>
    );
  }

  return jobList;
});

class ViewJobs extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push("/manager/newjob");
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
                Jobs under {session.user_name}
              </span>
            </h3>
          </Col>
          <Col xs={4}>
            <div style={{ float: "right" }}>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={this.handleClick}
              >
                Create a New Job
              </Button>
            </div>
          </Col>
        </Row>
        <br />
        <Jobs />
      </div>
    );
  }
}

export default withRouter(ViewJobs);
