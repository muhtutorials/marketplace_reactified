import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { loadJobDetail, acceptJob, declineJob, doneJob } from '../../actions/jobs';
import { truncateDate } from '../../utils';


class JobDetail extends React.Component {

  componentDidMount() {
    this.props.loadJobDetail(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    if (id !== prevProps.match.params.id) {
      this.props.loadJobDetail(id)
    }
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { isLoading, job } = this.props.jobDetail;

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
        buttons = <Button variant="primary" onClick={() => this.props.acceptJob(job.id)}>Accept</Button>
      } else if (user.username === job.freelancer) {
        buttons = (
          <>
            <Button variant="danger" className="mr-1" onClick={() => this.props.declineJob(job.id)}>Decline</Button>
            <Button variant="success" onClick={() => this.props.doneJob(job.id)}>Done</Button>
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
  }
}


const mapStateToProps = state => ({ auth: state.auth, jobDetail: state.jobDetail });


export default connect(mapStateToProps, { loadJobDetail, acceptJob, declineJob, doneJob })(JobDetail)
