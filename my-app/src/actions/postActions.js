import { FETCH_POSTS, NEW_POST,FETCH_STUDENTS ,DELETE_DEPARTMENT,ADD_STUDENT} from './types';

export const fetchPosts = () => dispatch => {
  fetch('http://localhost:4000/departments')
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
};


export const createPost = postData => dispatch => {
  console.log(postData);
  let depname= postData.depname;
  fetch('http://localhost:4000/departments/' + depname, {
    method: 'POST',
    headers: { 
      'content-type': 'application/json'
    },
   
  })
  .then(response => {
    if (response.ok) {
       
      fetch('http://localhost:4000/departments')
      .then(res => res.json())
      .then(posts =>
        dispatch({
          type: FETCH_POSTS,
          payload: posts
        })
      );
    }
});
};


export const fetchStudents = sdep  => dispatch => {
  console.log(sdep+"department id for studnetsss ");
  fetch('http://localhost:4000/students/'+sdep)
    .then(res => res.json())
    .then(students =>
      dispatch({
        type: FETCH_STUDENTS,
        payload: students
      })
    );
};

export const deleteDepartment = sdep  => dispatch => {
  console.log(sdep+"department id for delte ");
  fetch('http://localhost:4000/departments/'+sdep,{
    method:'DELETE'
  })
  .then(response => {
    if (response.ok) {
       
      fetch('http://localhost:4000/departments')
      .then(res => res.json())
      .then(posts =>
        dispatch({
          type: FETCH_POSTS,
          payload: posts
        })
      );
    }
});
};
export const updateDepartment = dep =>dispatch=>{
  fetch('http://localhost:4000/departments/'+dep.depid+'/'+dep.depname,{
    method:'PUT'
  }).then(response =>{
    if(response.ok){
      fetch('http://localhost:4000/departments')
      .then(res => res.json())
      .then(posts =>
        dispatch({
          type: FETCH_POSTS,
          payload: posts
        })
      );
    }
  });
};
export const addStudent= stu=>dispatch=>{
  fetch('http://localhost:4000/students/'+stu.sname+'/'+stu.semail+'/'+stu.sage+'/'+stu.sdepname+'/'+stu.sdepid,{
    method:'POST'
  }).then(response =>{
    if(response.ok){
      fetch('http://localhost:4000/students/'+stu.sdepid)
      .then(res => res.json())
      .then(posts =>
        dispatch({
          type: FETCH_STUDENTS,
          payload: posts
        })
      );
    }
  });
}

    /* .then(res => res.json())
    .then(post =>
      dispatch({
        
        type: NEW_POST,
        payload: post
      })
    ); */
