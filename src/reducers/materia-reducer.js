import { GET_MATERIA, CREATE_MATERIA, UPDATE_MATERIA } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_MATERIA:
      return action.payload.data;
    case CREATE_MATERIA:
      return action.payload.data;
    case UPDATE_MATERIA:
      return action.payload.data;
    default:
      return state;
  }
}
