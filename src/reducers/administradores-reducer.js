import { ADMINISTRADORES_REQ } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case ADMINISTRADORES_REQ:
      return action.payload.data;
    default:
      return state;
  }
}
