import React from "react";
import { Col, Row, Form, ButtonToolbar, Button } from "react-bootstrap";

export default class Timesheet extends React.Component {
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
      taskRows: newTaskRows
    });
  }

  renderTaskRows() {
    const { taskRows } = this.state;
    let timesheetRows = [];
    for (let i = 1; i <= taskRows; i++) {
      timesheetRows.push(
        <Form.Row key={i} style={{ paddingBottom: '1em' }}>
          <Col>
            <Form.Control as="select">
              <option> Enter a job code</option>
              <option>Job 1</option>
              <option>Job 2</option>
            </Form.Control>
          </Col>
          <Col>
            <Form.Control
              type="number"
              placeholder="Enter your hours"
              step="0.25"
              min="0"
            />
          </Col>
        </Form.Row>
      );
    }

    return timesheetRows;
  }

  render() {
    const { taskRows } = this.state;
    const addRemoveRows = (
      <ButtonToolbar
        style={{ display: "flex", justifyContent: "center", marginTop: "1em" }}
      >
        <Button
          disabled={ taskRows == 8 }
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
          disabled={ taskRows == 1 }
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
    const timesheetForm = (
      <Form>
        <Form.Row>
          <Col>
            <Form.Label>Date</Form.Label>
            <Form.Control as="input"
              type="date"
            />
          </Col>
          <Col />
          <Col />
          <Col>
            <Button style={{ float: 'right'}} variant="outline-dark" size="lg">
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
        <h3 style={{ textAlign: 'center' }}>
          <span
            style={{
              color: "#515A5A"
            }}
          >
            Submit a New Timesheet
          </span>
        </h3>
        <br />
        {timesheetForm}
      </div>
    );
  }
}
