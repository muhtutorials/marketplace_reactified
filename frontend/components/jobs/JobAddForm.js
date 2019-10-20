import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { addJob } from '../../actions/jobs';


class JobAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', description: '', budget: '' }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  });

  handleSubmit = event => {
    event.preventDefault();
    this.props.addJob({
      title: this.state.title,
      description: this.state.description,
      budget: this.state.budget},
      this.props.history
    );
  };

  render() {
    return (
      <div className="mt-4">
        <h3>Add a job</h3>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Title: </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description: </Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Budget: </Form.Label>
              <Form.Control
                type="number"
                name="budget"
                value={this.state.budget}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}


export default connect(null, { addJob })(JobAddForm);
