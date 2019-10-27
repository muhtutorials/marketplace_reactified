import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { loadJobDetail, acceptJob, declineJob, doneJob } from '../../actions/jobs';
import { truncateDate } from '../../utils';


const JobDetail = props => {
  useEffect(() => props.loadJobDetail(props.match.params.id), [props.match.params.id]);

  const { isAuthenticated, user } = props.auth;
  const { isLoading, job } = props.jobDetail;

  let color;
  if (job.status === 'available') {
    color = 'success';
  } else if (job.status === 'taken') {
    color = 'warning';
  } else if (job.status === 'done') {
    color = 'danger';
  }

  let buttons;
  if (isAuthenticated && Object.keys(job).length) {
    if (!job.freelancer) {
      buttons = <Button variant="primary" onClick={() => props.acceptJob(job.id)}>Accept</Button>
    } else if (user.username === job.freelancer) {
      buttons = (
        <>
          <Button variant="danger" className="mr-1" onClick={() => props.declineJob(job.id)}>Decline</Button>
          <Button variant="success" onClick={() => props.doneJob(job.id)}>Done</Button>
        </>
      )
    }
  }

  return (
    <Card className="mt-3">
      <Card.Header className="position-relative text-uppercase text-center font-weight-bold">
        Job details
        <span
          className={`position-absolute text-capitalize font-weight-normal text-${color}`}
          style={{ top: '0.3rem', right: '0.8rem' }}
        >
          {job.status} {job.freelancer && user.id === job.user ? `(by ${job.freelancer})` : ''}
        </span>
      </Card.Header>
      {
        !isLoading &&
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Text>{job.description}</Card.Text>
            <p>Budget: ${job.budget}</p>
            <p>Created: {truncateDate(job.timestamp)}</p>
            {buttons}
          </Card.Body>
      }
    </Card>
  )
};


JobDetail.propTypes = {
  loadJobDetail: PropTypes.func.isRequired,
  acceptJob: PropTypes.func.isRequired,
  declineJob: PropTypes.func.isRequired,
  doneJob: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  jobDetail: PropTypes.object.isRequired
};


const mapStateToProps = state => ({ auth: state.auth, jobDetail: state.jobDetail });


export default connect(mapStateToProps, { loadJobDetail, acceptJob, declineJob, doneJob })(JobDetail)
