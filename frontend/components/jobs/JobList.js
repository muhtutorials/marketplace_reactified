import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

import { loadJobList } from '../../actions/jobs';
import Job from './Job';


class JobList extends React.Component {
  // check if the right type of props is provided
  static propTypes = {
    jobList: PropTypes.object.isRequired,
    loadJobList: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadJobList();
  }

  render() {
    const { isLoading, jobs } = this.props.jobList;

    return (
      <>
        <div>
          {/* loop through jobs */}
          {jobs.length > 0 && jobs.map(
            job => <Job key={job.id} job={job} />
          )}
        </div>
        {isLoading && <div className="my-5 text-center"><Spinner animation="grow" /></div>}
     </>
    )
  }
}


// make state available to PostList component though props
const mapStateToProps = state => ({
  jobList: state.jobList
});


// connect React component to Redux store
export default connect(mapStateToProps, { loadJobList })(JobList)
