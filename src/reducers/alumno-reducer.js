import { ALUMNO_REQ } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case ALUMNO_REQ:
      return action.payload.data;
    default:
      return state;
  }
}
