import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

import { register } from '../../actions/auth';


const Register = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      props.createMessage({ passwordsNotMatch: 'Passwords do not match' });
    } else {
      props.register({ username, email, password, password2 });
      setUsername('');
      setEmail('');
      setPassword('');
      setPassword2('')
    }
  };

  // redirect to home page after logging in
  // which is done automatically on registering
  if (props.isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <Card className="p-3 mx-auto mt-4">
      <h2 className="text-center text-uppercase font-italic">Register</h2>
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
          <Form.Label>E-mail:</Form.Label>
          {/* text field */}
          <Form.Control
            type="email"
            maxLength="254"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
          <Form.Label>Confirm password:</Form.Label>
          {/* password field */}
          <Form.Control
            type="password"
            name="password2"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          {/* form isn't submitted without type='submit' attribute */}
          <Button type='submit' variant="primary">Register</Button>
        </Form.Group>
      </Form>
      <p>Have an account? <Link to="/login">Log in</Link></p>
    </Card>
  )
};


Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { register })(Register);
