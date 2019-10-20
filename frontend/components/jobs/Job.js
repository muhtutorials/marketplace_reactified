import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { truncateDate, truncateWords } from '../../utils';


const Job = props => {
  const { job } = props;

  let color;
  if (job.status === 'available') {
    color = 'success';
  } else if (job.status === 'taken') {
    color = 'warning';
  } else if (job.status === 'done') {
    color = 'danger';
  }

  return (
    <Card className="my-4 text-center">
      <Card.Header className="position-relative">
        <Card.Title>{job.title}</Card.Title>
        <span
          className={`position-absolute text-capitalize text-${color}`}
          style={{ top: '0.3rem', right: '0.8rem' }}
        >
          {job.status}
        </span>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {truncateWords(job.description, 50)}
        </Card.Text>
        <Link to={`jobs/${job.id}`}><Button variant="primary">View Details</Button></Link>
      </Card.Body>
      <Card.Footer className="text-muted">{truncateDate(job.timestamp)}</Card.Footer>
    </Card>
  )
};


Job.propTypes = {
  job: PropTypes.object.isRequired
};


export default Job;
