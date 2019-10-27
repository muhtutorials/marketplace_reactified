import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from '../../actions/auth';


const Navigation = props => {
  const { isAuthenticated, user } = props.auth;

  return (
    <Navbar bg="dark" variant="dark">
      <LinkContainer to="/"><Navbar.Brand href="#home">MARKETPLACE</Navbar.Brand></LinkContainer>
      <Nav className="mr-auto">
        <LinkContainer to="/job-add"><Nav.Link href="#home">Create a job</Nav.Link></LinkContainer>
      </Nav>
      <Nav className="ml-auto">
        {
          isAuthenticated ?
            <>
              <LinkContainer to="#"><Nav.Link href="#">{user.username}</Nav.Link></LinkContainer>
              <Nav.Link href="#" onClick={() => props.logout(props.history)}>Logout</Nav.Link>
            </>
          :
            <>
              <LinkContainer to="/login"><Nav.Link href="#">Login</Nav.Link></LinkContainer>
              <LinkContainer to="/register"><Nav.Link href="#">Register</Nav.Link></LinkContainer>
            </>
        }
      </Nav>
    </Navbar>
  )
};


const mapStateToProps = state => ({ auth: state.auth });


export default connect(mapStateToProps, { logout })(withRouter(Navigation));
