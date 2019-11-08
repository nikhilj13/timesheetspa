import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from 'react-router';
import { newJob } from './ajax';

class NewJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null
    };
	}

	changed(data) {
    this.props.dispatch({
      type: "CHANGE_NEW_JOB",
      data: data
    });
	}
	
	render() {
		if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
		}
		
    let { job_code, budget, name, description, errors } = this.props;
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{errors}</Alert>;
		}
		
		const newJobForm = (
			<Row>
        {error_msg}
        <Col xs={2} />
        <Col xs={8}>
          <Form>
            <Form.Group as={Row} controlId="job-id">
              <Form.Label column sm={2}>
                Job Code
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter Job Code"
                  onChange={ev => this.changed({ job_code: ev.target.value })}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="job-name">
              <Form.Label column sm={2}>
                Job Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Job Name"
                  onChange={ev => this.changed({ name: ev.target.value })}
                />
              </Col>
            </Form.Group>

						<Form.Group as={Row} controlId="job-budget">
              <Form.Label column sm={2}>
                Budget
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Budget"
                  onChange={ev => this.changed({ budget: ev.target.value })}
                />
              </Col>
            </Form.Group>

						<Form.Group as={Row} controlId="job-description">
              <Form.Label column sm={2}>
                Description
              </Form.Label>
              <Col sm={10}>
                <Form.Control
									as="textarea"
									rows="3"
                  placeholder="Job Description"
                  onChange={ev => this.changed({ description: ev.target.value })}
                />
              </Col>
            </Form.Group>

            <div className="text-align-center">
              <Button
                variant="outline-primary"
                onClick={() => newJob()}
              >
                Submit Job
              </Button>
            </div>
          </Form>
        </Col>
        <Col xs={2} />
      </Row>
    );

		return (
			<div>
        <h3 style={{ textAlign: 'center' }}>
          <span
            style={{
              color: "#515A5A"
            }}
          >
            Submit a New Job
          </span>
        </h3>
        <br />
        {newJobForm}
      </div>
		);
	}
}

function state2props(state) {
  return state.forms.new_job;
}

export default connect(state2props)(NewJob);
