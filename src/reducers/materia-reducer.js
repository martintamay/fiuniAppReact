import { GET_MATERIA, CREATE_MATERIA, UPDATE_MATERIA, RESET_MATERIA, SET_PROFESOR_MATERIA } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_MATERIA:
      return action.payload.data;
    case CREATE_MATERIA:
      return action.payload.data;
    case UPDATE_MATERIA:
      return action.payload.data;
    case RESET_MATERIA:
      return null;
    case SET_PROFESOR_MATERIA:
      if (state!==null && state.id === action.payload.data.id){
        return action.payload.data;
      } else {
        return state;
      }
    default:
      return state;
  }
}
