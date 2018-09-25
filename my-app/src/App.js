/* import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: 'Initial data...'
    }
    this.updateState = this.updateState.bind(this);
  };
  updateState() {
    <h1>{this.props.headprop}</h1>
    this.setState({ data: 'Data updated from the child component...' })
  }
  render() {
    return (
      <div>
        <Content myDataProp={this.state.data}
          updateStateProp={this.updateState}></Content>
      </div>
    );
  }
}
class Content extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.updateStateProp}>CLICK</button>
        <h3>{this.props.myDataProp}</h3>

      </div>
      );
  }
}
export default App;
/////////////// */
// import React, {Component} from 'react';
// // import Validation from 'react-validation';
// // import "../validation.js";
// import {Button, Form} from "react-bootstrap";

// // import Map from './Map';
// <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>


// export default class Registration extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             depname: '',
//             }
//         this.handleSubmit = this.handleSubmit.bind(this)
//     }

//     handleSubmit(event) {
//         event.preventDefault()
//         var data = {
//             depname: this.state.depname,

//         }
//         console.log(data)
//         fetch("/departments/"+data.depname, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(data)
//         }).then(function(response) {
//             if (response.status >= 400) {
//               throw new Error("Bad response from server");
//             }
//             return response.json();
//         }).then(function(data) {
//             console.log(data)    
//             if(data == "success"){
//                this.setState({msg: "Thanks for registering"});  
//             }
//         }).catch(function(err) {
//             console.log(err)
//         });
//     }

//     logChange(e) {
//        // this.setState({[e.target.name]: e.target.value});  
//     }

//     render() {
//         return (
//             <div className="container register-form">
//                 <Form onSubmit={this.handleSubmit} method="POST">
//                     <label>Name</label>
//                     <input onChange={this.logChange}  className="form-control" value='' placeholder='enter dep name' name='depname'/>
//                     <div className="submit-section">
//                         <Button className="btn btn-uth-submit">Submit</Button>
//                     </div>
//                 </Form>
//             </div>
//         );
//     }
// }
/* 
import React, { Component } from 'react';
// import Modal from 'react-modal';
export default class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [{}]
        }
    }

    componentDidMount() {
        fetch('http://localhost:4000/departments', {
            method: 'GET'
        })
        .then((Response) => {
            console.log(Response[0].depid);
            return Response.json();
        }).then(function (data) {
            console.log(data);
            this.setState({ users: data });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default p50 uth-panel">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th> name</th>

                            </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map(member =>
                                <tr key={member.id}>
                                    <td><a>Edit</a>|<a>Delete</a></td>
                                    <td>{member.depname} </td>


                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
} */ 

import React, { Component } from 'react';
import './App.css';
import Modal from 'react-responsive-modal';
// import Button from 'react-bootstrap';
// import table from 'react-bootstrap-table'
import { Button } from 'react-bootstrap';
{/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous"></link>; */}
const divStyle = {
    margin: '100px',
    border: '5px solid #4CAF50',
    backgroundcolor:'#4CAF50',
    fontsize: '55px'
  };
  const thStyle={
    paddingtop: '12px',
    paddingbottom: '12px',
    textalign: 'left',
    backgroundcolor: '#4CAF50',
    color: 'white'
  };
var data1;

 
class App extends Component {
    constructor(){
        super();
        this.state ={departments: [],students:[],check_view_studnets:0,open_add_department_modal:0};
    }
    onOpenModal = () => {
        this.setState({ open_add_department_modal: 1 });
      };
      onCloseModal = () => {
        this.setState({ open_add_department_modal: 0 });
      };
    
    componentDidMount() {
        fetch('http://localhost:4000/departments', {
  // mode: 'no-cors',
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
},
).then(response => {
  if (response.ok) {
    response.json().then(json => {
      console.log(json);
      data1= json;
      this.setState({ departments: data1 });
    });
  }
});}
     edit_dep(sdep){

        console.log("in edit button click "+sdep);
        
        
    }
    delete_dep(sdep){
        console.log("in delete button click "+sdep);
        fetch('http://localhost:4000/departments/'+sdep, {
            // mode: 'no-cors',
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          },
          ).then(response => {
            if (response.ok) {
              response.json().then(json => {
                console.log(json);
                data1= json;
                this.setState({ students: data1 , check_view_studnets:1});
              });
            }
          });
        
    }
    view_students(sdep){
        console.log("in view students"+sdep);
       
            fetch('http://localhost:4000/students/'+sdep, {
      // mode: 'no-cors',
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ).then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json);
          data1= json;
          this.setState({ students: data1 , check_view_studnets:1});
        });
      }
    });}
   /*  if(this.state.check_view_studnets){
        console.log("u chose studentssssds");
        this.setState({ students: false });
    } */

  render() {
  /*   if(this.state.check_view_studnets===1){
        console.log("u chose studentssssds");
        this.setState({ check_view_studnets: 0 });
        return "helloo";

        }
        else{ */
    return (
      <div className="App" style={divStyle}>
       
        <div className="panel panel-default p50 uth-panel">
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
                                   <td><Button bsStyle="info" onClick={this.view_students.bind(this, member.depid)} > View Students</Button></td><td> <Button bsStyle="warning"  onClick={this.edit_dep.bind(this, member.depid)} > Edit</Button></td><td><Button bsStyle="danger" onClick={this.delete_dep.bind(this, member.depid)} >Delete</Button></td>
                                   
                                    


                                </tr>
                            )}
                        </tbody>
                    </table>
                   
                </div>
            </div>
            <Button bsStyle="success"  > Add Department</Button>
                </div>
        {/* <table data1={data1}/> */}
      </div>
      
     
    );
}}

export default App;