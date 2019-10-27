import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addJob } from '../../actions/jobs';


const JobAddForm = props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    props.addJob({ title, description, budget }, props.history);
  };

  return (
    <div className="mt-4">
      <h3>Add a job</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title: </Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description: </Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Budget: </Form.Label>
            <Form.Control
              type="number"
              name="budget"
              value={budget}
              onChange={e => setBudget(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  )
};



JobAddForm.propTypes = {
  addJob: PropTypes.func.isRequired
};


export default connect(null, { addJob })(JobAddForm);
