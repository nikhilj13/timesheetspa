import React from "react";
import { Col, Row, Form, ButtonToolbar, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { getJobs, newTimesheet } from "./ajax";

let Jobs = connect(({ jobs }) => ({ jobs }))(({ jobs }) => {
  let jobList = [];
  if (jobs && jobs.length < 1) {
    getJobs();
  }

  if (jobs.length) {
    jobList.push(
      <option key="default" value="default">
        Select a Job Code
      </option>
    );
    jobs.forEach((element, index) => {
      jobList.push(
        <option key={index} value={`${element.job_code}`}>
          {element.job_code}
        </option>
      );
    });
  } else {
    jobList = <option> No Jobs Available </option>;
  }

  return jobList;
});

class Timesheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskRows: 1
    };
    this.changeRows = this.changeRows.bind(this);
  }

  changeRows(option) {
    const { taskRows } = this.state;
    let newTaskRows = taskRows;
    if (option == "add") {
      newTaskRows = taskRows == 8 ? 8 : taskRows + 1;
    } else if (option == "remove") {
      newTaskRows = taskRows <= 1 ? 1 : taskRows - 1;
    }
    this.setState({
      taskRows: newTaskRows,
      redirect: null,
    });
  }

  changed(data) {
    this.props.dispatch({
      type: "CHANGE_NEW_TIMESHEET",
      data: data
    });
  }

  renderTaskRows() {
    const { taskRows } = this.state;
    let timesheetRows = [];
    const {
      job1,
      hours1,
      job2,
      hours2,
      job3,
      hours3,
      job4,
      hours4,
      job5,
      hours5,
      job6,
      hours6,
      job7,
      hours7,
      job8,
      hours8,
    } = this.props;
    for (let i = 1; i <= taskRows; i++) {
      const job = `job${i}`;
      const hours = `hours${i}`;
      timesheetRows.push(
        <Form.Row key={i} style={{ paddingBottom: "1em" }}>
          <Col>
            <Form.Control
              onChange={ev => this.changed({ [job]: ev.target.value })}
              as="select"
              defaultValue="default"
            >
              <Jobs />
            </Form.Control>
          </Col>
          <Col>
            <Form.Control
              type="number"
              placeholder="Enter your hours"
              step="0.25"
              min="0"
              onChange={ev => this.changed({ [hours]: ev.target.value })}
            />
          </Col>
        </Form.Row>
      );
    }

    return timesheetRows;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    
    const { taskRows } = this.state;
    const { errors } = this.props;
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{errors}</Alert>;
		}

    const addRemoveRows = (
      <ButtonToolbar
        style={{ display: "flex", justifyContent: "center", marginTop: "1em" }}
      >
        <Button
          disabled={taskRows == 8}
          variant="outline-success"
          size="sm"
          style={{ marginRight: "1em" }}
          onClick={() => {
            this.changeRows("add");
          }}
        >
          Add a Row
        </Button>
        <Button
          disabled={taskRows == 1}
          variant="outline-danger"
          size="sm"
          onClick={() => {
            this.changeRows("remove");
          }}
        >
          Remove a Row
        </Button>
      </ButtonToolbar>
    );

    const { date } = this.props;
    const timesheetForm = (
      <Form>
        <Form.Row>
          <Col>
            <Form.Label>Date</Form.Label>
            <Form.Control
              as="input"
              type="date"
              onChange={ev => this.changed({ date: ev.target.value })}
            />
          </Col>
          <Col />
          <Col />
          <Col>
            <Button
              style={{ float: "right" }}
              variant="outline-dark"
              size="lg"
              onClick={() => newTimesheet()}
            >
              Submit Timesheet
            </Button>
          </Col>
        </Form.Row>
        <br />
        <Form.Row>
          <Col>
            <Form.Label>Job Code</Form.Label>
          </Col>
          <Col>
            <Form.Label>Hours</Form.Label>
          </Col>
        </Form.Row>
        {this.renderTaskRows()}
        {addRemoveRows}
      </Form>
    );

    return (
      <div>
        <h3 style={{ textAlign: "center" }}>
          <span
            style={{
              color: "#515A5A"
            }}
          >
            Submit a New Timesheet
          </span>
        </h3>
        <br />
        {error_msg}
        {timesheetForm}
      </div>
    );
  }
}

function state2props(state) {
  return state.forms.new_timesheet;
}

export default connect(state2props)(Timesheet);
