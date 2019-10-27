import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

import { login } from '../../actions/auth';


const Login = props => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    props.login(username, password);
  };

  // redirect to home page after logging in
  if (props.isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <Card className="p-3 mx-auto mt-4">
      <h2 className="text-center text-uppercase font-italic">Log in</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          {/* text field */}
          <Form.Control
            type="text"
            maxLength="30"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          {/* password field */}
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
};


Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { login })(Login);
