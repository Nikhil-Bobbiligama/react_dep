import React, { Component } from 'react';
import './App.css';
import Modal from 'react-responsive-modal';
import { Button } from 'react-bootstrap';
const divStyle = {
    margin: '50px',

    backgroundcolor: '#4CAF50',
    fontsize: '55px',
    width: '70%'
};

var data1;


class App1 extends Component {
    constructor() {
        super();
        console.log("in constructor");
        this.state = {new_student_modal:false, student_id: 0, edit_student_modal: false, edit_student_name: '', edit_student_age: '', edit_student_email: '', new_student_name: '', new_student_age: '', new_student_email: '', ref_dep_id: 0, ref_dep_name: '', refresh_department: false, departments: [], students: [], check_view_studnets: 0, open_department_modal: false, new_department: '', edit_department_modal: false, edit_department: '', view_students_modal: false };
    }
    onOpenModal = (str) => {
        if (str === 'new department') {
            this.setState({ open_department_modal: true });
        }
        if (str === 'edit department') {
            console.log("u choose edit modal")
            this.setState({ edit_department_modal: true });
        }
        if (str === 'view students') {
            this.setState({ view_students_modal: true });
        }
        if (str === 'new student') {
            this.setState({ new_student_modal: true });
        }
        if (str === 'edit student') {
            this.setState({ edit_student_modal: true });
        }
    };
    onCloseModal = (str) => {
        if (str === 'new department') {
            this.setState({ open_department_modal: false });
        }
        if (str === 'edit department') {
            this.setState({ edit_department_modal: false });
        }
        if (str === 'view students') {
            this.setState({ view_students_modal: false });
        }
        if (str === 'new student') {
            this.setState({ new_student_modal: false });
        }
        if (str === 'edit student') {
            this.setState({ edit_student_modal: false });
        }
    };

    componentWillMount() {
        fetch('http://localhost:4000/departments', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },
        ).then(respons => {
            console.log("responnsss"+respons);
            if (respons.ok) {
                respons.json().then(json => {
                    console.log(json);
                    data1 = json;
                    this.setState({ departments: data1 });
                });
            }
        });
    }
    add_dep() {
        let depname = this.state.new_department;
        this.setState({ open_department_modal: false });
        fetch('http://localhost:4000/departments/' + depname, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
        },
        ).then(response => {
            if (response.ok) {
                console.log(response);
                console.log("addded succesfully!!");
                this.componentWillMount();
            }
        });
        this.setState({ new_department: '' });
    }
    add_student() {
        this.setState({ view_students_modal: false });
        fetch('http://localhost:4000/students/' + this.state.new_student_name + '/' + this.state.new_student_email + '/' + this.state.new_student_age + '/' + this.state.ref_dep_name + '/' + this.state.ref_dep_id, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
        },
        ).then(response => {
            if (response.ok) {
                this.setState({ refresh_department: true });
                console.log("addded succesfully!!");
                // setInterval(this.view_students,5000);

                this.view_students(this.state.ref_dep_id, this.state.ref_dep_name);
            }
        });
        this.setState({ refresh_department: false, new_student_age: '', new_student_name: '', new_student_email: '', new_student_modal: false });
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
    ///////////////////////////
    edit_dep(sdepname, sdepid) {
        this.setState({ ref_dep_id: sdepid, edit_department_modal: true, edit_department: sdepname });
    }
    edit_student(sname, sage, semail, sid) {
        this.setState({ edit_student_modal: true, edit_student_name: sname, edit_student_email: semail, edit_student_age: sage, student_id: sid });
    }
    update_dep() {
        this.onCloseModal('edit department');
        fetch('http://localhost:4000/departments/' + this.state.ref_dep_id + '/' + this.state.edit_department, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
            },
        },
        ).then(response => {
            if (response.ok) {
                console.log("updatedd succesfuly");
                this.componentWillMount();
            }
        });
    }
    update_student() {
        this.onCloseModal('edit student');
        fetch('http://localhost:4000/students/' + this.state.student_id + '/' + this.state.edit_student_name + '/' + this.state.edit_student_email + '/' + this.state.edit_student_age + '/' + this.state.ref_dep_name + '/' + this.state.ref_dep_id, {

            method: 'PUT',
            Data: { pname: this.state.edit_student_name },
            headers: {
                Accept: 'json/application/JSON',
            },
        },
        ).then(response => {
            if (response.ok) {
                console.log("updatedd succesfuly");
                this.view_students(this.state.ref_dep_id, this.state.ref_dep_name);
            }
        });
    }
    delete_dep(sdep) {
        fetch('http://localhost:4000/departments/' + sdep, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        },
        ).then(response => {
            if (response.ok) {
                console.log("deleted succesfuly");
                this.componentWillMount();
            }
        });

    }
    delete_student(stuid) {
        fetch('http://localhost:4000/students/' + stuid, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        },
        ).then(response => {
            if (response.ok) {
                console.log("deleted succesfuly");
                this.view_students(this.state.ref_dep_id, this.state.ref_dep_name);
            }
        });
    }
    view_students(sdep, sdepname) {
        this.setState({ ref_dep_name: sdepname, ref_dep_id: sdep });
       
        fetch('http://localhost:4000/students/' + sdep, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    console.log(json);
                    console.log(response);
                    data1 = json;
                    this.setState({ students: data1});
                });
            }
        }); 
        console.log("request to openn modal");
        this.onOpenModal('view students'); }

    render() {

        return (

            <div className="App" >
                <br />
                <br />

                <div className="panel panel-default p50 uth-panel" style={divStyle}>
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
                                    {this.state.departments.map(member =>
                                        <tr key={member.depid}>
                                            <td>{member.depname} </td>
                                            <td>{member.depid} </td>
                                            <td><Button bsStyle="info" onClick={this.view_students.bind(this, member.depid, member.depname)} > View Students</Button></td><td> <Button bsStyle="warning" onClick={this.edit_dep.bind(this, member.depname, member.depid)} > Edit</Button></td><td><Button bsStyle="danger" onClick={this.delete_dep.bind(this, member.depid)} >Delete</Button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>

                        <Button bsStyle="success" onClick={this.onOpenModal.bind(this, 'new department')}  > Add Department</Button>
                        <Modal open={this.state.open_department_modal} onClose={this.onCloseModal.bind(this, 'new department')} >
                            <h2>Add Department </h2>
                            <br /> Department<br />
                            <input id="new_depname" name="new_department" type="text" value={this.state.new_department} onChange={this.handleChange.bind(this)} ></input>
                            <br />
                            <Button bsStyle="success" onClick={this.add_dep.bind(this)}  > save</Button>
                        </Modal>
                        <Modal open={this.state.edit_department_modal} onClose={this.onCloseModal.bind(this, 'edit department')} >

                            <h2>Edit Department </h2>
                            <br /> Department<br />
                            <input id="edit_depname" name="edit_department" type="text" value={this.state.edit_department} onChange={this.handleChange.bind(this)} ></input>
                            <br />
                            <Button bsStyle="success" onClick={this.update_dep.bind(this)}  > update</Button>
                        </Modal>
                        <Modal open={this.state.view_students_modal} onClose={this.onCloseModal.bind(this, 'view students')} >

                            <div className="panel panel-default p50 uth-panel">
                                <h4> Students of Department:</h4> <span>    </span><h3>{this.state.ref_dep_name}</h3>
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
                                        {this.state.students.map(member =>
                                            <tr key={member.id}>
                                                <td> {member.id}</td>
                                                <td>{member.sname} </td>
                                                <td>{member.semail} </td>
                                                <td>{member.sage} </td>

                                                {/* <td><Button bsStyle="info" onClick={this.view_students.bind(this, member.depid)} > View Students</Button></td><td> <Button bsStyle="warning"  onClick={this.edit_dep.bind(this, member.depid)} > Edit</Button></td><td><Button bsStyle="danger" onClick={this.delete_dep.bind(this, member.depid)} >Delete</Button></td> */}
                                                <td> <Button bsStyle="warning" onClick={this.edit_student.bind(this, member.sname, member.sage, member.semail, member.id)} > Edit</Button></td><td><Button bsStyle="danger" onClick={this.delete_student.bind(this, member.id)} >Delete</Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                            </div>
                            <Button bsStyle="success" onClick={this.onOpenModal.bind(this, 'new student')} > Add student</Button>
                        </Modal>
                        <Modal open={this.state.new_student_modal} onClose={this.onCloseModal.bind(this, 'new student')} >

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
                        <Modal open={this.state.edit_student_modal} onClose={this.onCloseModal.bind(this, 'edit student')} >

                            <h2>Edit Student </h2>
                            <br /> Name<br />
                            <input id="edit_student_name" name="edit_student_name" type="text" value={this.state.edit_student_name} onChange={this.handleChange.bind(this)} ></input>
                            <br /> Age<br />
                            <input id="edit_student_age" name="edit_student_age" type="text" value={this.state.edit_student_age} onChange={this.handleChange.bind(this)} ></input>
                            <br /> Email<br />
                            <input id="edit_student_email" name="edit_student_email" type="text" value={this.state.edit_student_email} onChange={this.handleChange.bind(this)} ></input>
                            <br />
                            <Button bsStyle="success" onClick={this.update_student.bind(this)}  > update</Button>
                        </Modal>
                    </div>
                </div>

            </div>

        );
    }
}

export default App1;

