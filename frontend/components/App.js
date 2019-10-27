import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
// HashRouter (adds pound sign to url) is used instead of BrowserRouter because on page reload
// browser will look for the page defined on the backend, which in our case defined on the frontend
// To use BrowserRouter during production server needs some configuring
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import store from '../store';
import { loadUser } from '../actions/auth';
import Navigation from './common/Navigation';
import PrivateRoute from './accounts/PrivateRoute';
import Login from './accounts/Login';
import Register from './accounts/Register';
import JobList from './jobs/JobList';
import JobDetail from './jobs/JobDetail';
import JobAddForm from './jobs/JobAddForm';


const App = () => {
  useEffect(() => store.dispatch(loadUser()), []);

  return (
    // Provider component makes store data available to all components inside it
    <Provider store={store}>
      <Router>
        <Navigation />
        {/* bootstrap container */}
        <Container>
          <div className="top">
            <Switch>
              <Route exact path="/" component={JobList} />
              <Route exact path="/jobs/:id" component={JobDetail} />
              <PrivateRoute exact path="/job-add" component={JobAddForm} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </Container>
      </Router>
    </Provider>
  )
};


export default App;
