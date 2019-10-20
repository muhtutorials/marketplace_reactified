import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

import { login } from '../../actions/auth';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' }
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  handleChange = event => this.setState({
    // "[event.target.name]" is "computed property name" syntax
    [event.target.name]: event.target.value
  });

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    // redirect to home page after logging in
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }

    return (
      <Card className="p-3 mx-auto mt-4">
        <h2 className="text-center text-uppercase font-italic">Log in</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            {/* text field */}
            <Form.Control
              type="text"
              maxLength="30"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            {/* password field */}
            <Form.Control
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            {/* form isn't submitted without type='submit' attribute */}
            <Button type='submit' variant="primary">Log in</Button>
          </Form.Group>
        </Form>
        <Link to="/password-reset"><p>Forgot password?</p></Link>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </Card>
    )
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { login })(Login);
