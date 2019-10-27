import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

import { loadJobList } from '../../actions/jobs';
import Job from './Job';


const JobList = props => {
  useEffect(() => props.loadJobList(), []);

  const { isLoading, jobs } = props.jobList;

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
};


// check if the right type of props is provided
JobList.propTypes = {
  jobList: PropTypes.object.isRequired,
  loadJobList: PropTypes.func.isRequired
};


// make state available to PostList component though props
const mapStateToProps = state => ({
  jobList: state.jobList
});


// connect React component to Redux store
export default connect(mapStateToProps, { loadJobList })(JobList)
