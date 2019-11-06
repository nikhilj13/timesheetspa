import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { submit_login } from './ajax';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null
    };
  }

  changed(data) {
    this.props.dispatch({
      type: "CHANGE_LOGIN",
      data: data
    });
	}
	
	redirect(path) {
    this.setState({
      redirect: path,
    });
  }

  render() {
		if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
		}
		
    let { email, password, user_type, errors } = this.props;
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{errors}</Alert>;
    }

    const logInForm = (
      <Row>
        {error_msg}
        <Col xs={2} />
        <Col xs={8}>
          <Form>
            <Form.Group as={Row} controlId="user-email">
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={ev => this.changed({ email: ev.target.value })}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="user-password">
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={ev => this.changed({ password: ev.target.value })}
                />
              </Col>
            </Form.Group>

            <fieldset>
              <Form.Group as={Row} controlId="user-type">
                <Form.Label column sm={2}>
                  Login As
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
										type="radio"
										checked={ user_type === 'worker' }
                    label="Worker"
                    name="user-type"
										id="worker-radio-button"
										onChange={() => this.changed({ user_type: 'worker' })}
                  />
                  <Form.Check
										type="radio"
										checked={ user_type === 'manager' }
                    label="Manager"
                    name="user-type"
										id="manager-radio-button"
										onChange={() => this.changed({ user_type: 'manager' })}
                  />
                </Col>
              </Form.Group>
            </fieldset>

            <div className="text-align-center">
              <Button
                variant="outline-primary"
                type="login"
                onClick={() => submit_login(this)}
              >
                Login
              </Button>
            </div>
          </Form>
        </Col>
        <Col xs={2} />
      </Row>
    );

    return <div>{logInForm}</div>;
  }
}

function state2props(state) {
  return state.forms.login;
}

export default connect(state2props)(Login);
