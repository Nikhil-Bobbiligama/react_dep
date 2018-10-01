import { FETCH_POSTS, NEW_POST, FETCH_STUDENTS,ADD_STUDENT,DELETE_STUDENT} from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      };
    case NEW_POST:
    console.log("in new department render "+action.payload);
      return {
        ...state,
        item: action.payload
        
      };
      case FETCH_STUDENTS:
      console.log("u choose view students"+ action.payload);
      return {
        ...state,
        items: action.payload
      }
      case ADD_STUDENT:
      console.log("u choose view students"+ action.payload);
      return {
        ...state,
        item: action.payload
      }
     
    default:
      return state;
  }
}
