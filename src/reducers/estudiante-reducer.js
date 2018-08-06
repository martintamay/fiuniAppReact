import { ESTUDIANTE_REQ, CREATE_ESTUDIANTE, UPDATE_ESTUDIANTE } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case ESTUDIANTE_REQ:
      return action.payload.data;
    case CREATE_ESTUDIANTE:
      return action.payload.data;
    case UPDATE_ESTUDIANTE:
      return action.payload.data;
    default:
      return state;
  }
}
