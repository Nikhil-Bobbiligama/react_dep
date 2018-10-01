import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';
import Modal from 'react-responsive-modal';
import { Button } from 'react-bootstrap';
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      open_department_modal:false,
      close_department_modal:false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
 add()
 {
this.setState({open_department_modal:true});
 }
  onSubmit(e) {
    e.preventDefault();
     this.setState({close_department_modal:true,open_department_modal:false})
    const post = {
      depname: this.state.title,
     
    };

    this.props.createPost(post);
  }

  render() {
    return (
      <div>
      <Button bsStyle="info" onClick={this.add.bind(this)}>ADd Department</Button>
      <Modal open={this.state.open_department_modal} onClose={this.state.close_department_modal} >
      <h2>Add Department </h2>
      <div>
        
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Department Name: </label>
            <br />
            <input
              type="text"
              name="title"
              onChange={this.onChange}
              value={this.state.title}
            />
          </div>
          <br />
         
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
  </Modal>
   </div>
    );
  }
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired
};

export default connect(null, { createPost })(PostForm);
