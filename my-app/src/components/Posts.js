import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import Modal from 'react-responsive-modal';
import { fetchStudents } from '../actions/postActions';
import { deleteDepartment } from '../actions/postActions';
import { updateDepartment } from '../actions/postActions';
import { addStudent } from '../actions/postActions';


import { Button } from 'react-bootstrap';
const divStyle = {
  margin: '50px',

  backgroundcolor: '#4CAF50',
  fontsize: '55px',
  width: '70%'
};

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      open_students_modal: false,
      close_students_modal: false,
      edit_department_modal: false,
      edit_department: '',
      ref_depid: '',
      ref_depname: '',
      open_student_add_modal: false,
      new_student_name:'',
      new_student_age:'',
      new_student_email:''
    }
  }
  componentWillMount() {
    this.props.fetchPosts();
  }
  handleChange(event) {
    console.log(event.target.name + "ssssrrrrrrrrrr");
    var dum = event.target.name;
    if (dum === 'new_department') {
      this.setState({
        new_department: event.target.value
      });
    }
    if (dum === 'edit_department') {
      this.setState({
        edit_department: event.target.value
      });
    }
    if (dum === 'new_student_name') {
      this.setState({
        new_student_name: event.target.value
      });
    }
    if (dum === 'new_student_age') {
      this.setState({
        new_student_age: event.target.value
      });
    }
    if (dum === 'new_student_email') {
      this.setState({
        new_student_email: event.target.value
      });
    }
    if (dum === 'edit_student_name') {
      this.setState({
        edit_student_name: event.target.value
      });
    }
    if (dum === 'edit_student_age') {
      this.setState({
        edit_student_age: event.target.value
      });
    }
    if (dum === 'edit_student_email') {
      this.setState({
        edit_student_email: event.target.value
      });
    }
  }
  onCloseModal = (str) => {
    if (str === 'new department') {
      this.setState({ open_department_modal: false });
    }
    if (str === 'edit department') {
      this.setState({ edit_department_modal: false });
    }
    if (str === 'view students') {
      this.setState({ open_students_modal: false });
      this.props.fetchPosts();
    }
    if (str === 'new student') {
      this.setState({ new_student_modal: false });
    }
    if (str === 'open new student') {
      console.log("request for modal add student")
      this.setState({ open_student_add_modal: true });

    }
    if (str === 'edit student') {
      this.setState({ edit_student_modal: false });
    }
  };
  view_students(sdep, sdepname) {
    this.setState({ open_students_modal: true, ref_depid: sdep, ref_depname: sdepname });
    console.log("in view studnets " + sdep);
    this.props.fetchStudents(sdep);
  }
  edit_department(depid, depname) {
    this.setState({ edit_department_modal: true, edit_department: depname, ref_depid: depid });

  }
  delete_department(sdep) {
    this.props.deleteDepartment(sdep);
  }
  add_student() {
    let stu={
        sname:this.state.new_student_name,
        semail:this.state.new_student_email,
        sage:this.state.new_student_age,
        sdepid:this.state.ref_depid,
        sdepname:this.state.ref_depname,     
    }
    this.setState({
      open_student_add_modal: false,
      new_student_name:'',
      new_student_age:'',
      new_student_email:''

    });
    this.props.addStudent(stu);
  }
  update_dep() {
    let depid = this.state.ref_depid, depname = this.state.edit_department;
    const dep = {
      depid, depname
    }
    this.setState({edit_department_modal:false})
    this.props.updateDepartment(dep);
  }
  render() {
    const postItems = (
      <div >
        <h2>Department Details</h2>
        <div className="container">

          <div className="panel panel-default p50 uth-panel">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th> Department</th>
                  <th> ID</th>
                  <th colSpan='3'> Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.posts.map(member =>
                  <tr key={member.depid}>
                    <td>{member.depname} </td>
                    <td>{member.depid} </td>
                    <td><Button bsStyle="info" onClick={this.view_students.bind(this, member.depid, member.depname)}>View Students</Button></td><td> <Button bsStyle="warning" onClick={this.edit_department.bind(this, member.depid, member.depname)} > Edit</Button></td><td><Button bsStyle="danger" onClick={this.delete_department.bind(this, member.depid)} >Delete</Button></td>
                  </tr>
                )}
              </tbody>
            </table>

          </div> </div> </div>

    );
    const students = (
      <div>
        <Modal open={this.state.open_students_modal} onClose={this.onCloseModal.bind(this, 'view students')} >

          <div className="panel panel-default p50 uth-panel">
            <h4> Students of Department:</h4> <span>    </span>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th> ID</th>
                  <th> Name</th>
                  <th> Email</th>
                  <th> Age</th>
                  <th colSpan='2'> Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.posts.map(member =>
                  <tr key={member.id}>
                    <td> {member.id}</td>
                    <td>{member.sname} </td>
                    <td>{member.semail} </td>
                    <td>{member.sage} </td>

                    {/* <td><Button bsStyle="info" onClick={this.view_students.bind(this, member.depid)} > View Students</Button></td><td> <Button bsStyle="warning"  onClick={this.edit_dep.bind(this, member.depid)} > Edit</Button></td><td><Button bsStyle="danger" onClick={this.delete_dep.bind(this, member.depid)} >Delete</Button></td> */}
                    <td> <Button bsStyle="warning"  > Edit</Button></td><td><Button bsStyle="danger"  >Delete</Button></td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
          <Button bsStyle="success" onClick={this.onCloseModal.bind(this, 'open new student')}> Add student</Button>
        </Modal>
        <Modal open={this.state.edit_department_modal} onClose={this.onCloseModal.bind(this, 'edit department')} >

          <h2>Edit Department </h2>
          <br /> Department<br />
          <input id="edit_depname" name="edit_department" type="text" value={this.state.edit_department} onChange={this.handleChange.bind(this)} ></input>
          <br />
          <Button bsStyle="success" onClick={this.update_dep.bind(this)}  > update</Button>
        </Modal>
        <Modal open={this.state.open_student_add_modal} onClose={this.onCloseModal.bind(this, 'new student')} >

          <h2>Add student </h2>
          <br /> Name<br />
          <input id="new_student_name" name="new_student_name" type="text" value={this.state.new_student_name} onChange={this.handleChange.bind(this)} ></input>
          <br /> Age<br />
          <input id="new_student_age" name="new_student_age" type="text" value={this.state.new_student_age} onChange={this.handleChange.bind(this)} ></input>
          <br /> Email<br />
          <input id="new_student_email" name="new_student_email" type="text" value={this.state.new_student_email} onChange={this.handleChange.bind(this)} ></input>


          <br />
          <Button bsStyle="success" onClick={this.add_student.bind(this)}  > save</Button>
        </Modal>
      </div>
    );

    return (
      <div>

        {postItems}
        {students}
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
};



const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts, fetchStudents, deleteDepartment, updateDepartment,addStudent })(Posts);
