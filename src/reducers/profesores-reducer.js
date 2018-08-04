import { PROFESORES_REQ } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case PROFESORES_REQ:
      return action.payload.data;
    default:
      return state;
  }
}
