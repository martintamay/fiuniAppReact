import { GET_EXAMEN, CREATE_EXAMEN, UPDATE_EXAMEN } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_EXAMEN:
      return action.payload.data;
    case CREATE_EXAMEN:
      return action.payload.data;
    case UPDATE_EXAMEN:
      return action.payload.data;
    default:
      return state;
  }
}
