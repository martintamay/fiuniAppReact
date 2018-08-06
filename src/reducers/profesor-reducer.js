import { PROFESOR_CREATE, PROFESOR_UPDATE, GET_PROFESOR, RESET_PROFESOR } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case PROFESOR_CREATE:
      return action.payload.data;
    case PROFESOR_UPDATE:
      return action.payload.data;
    case GET_PROFESOR:
      return action.payload.data;
    case RESET_PROFESOR:
      return null;
    default:
      return state;
  }
}
