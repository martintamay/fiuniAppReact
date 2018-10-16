import { ADMINISTRADOR_CREATE, ADMINISTRADOR_UPDATE, GET_ADMINISTRADOR, RESET_ADMINISTRADOR } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case ADMINISTRADOR_CREATE:
      return action.payload.data;
    case ADMINISTRADOR_UPDATE:
      return action.payload.data;
    case GET_ADMINISTRADOR:
      return action.payload.data;
    case RESET_ADMINISTRADOR:
      return null;
    default:
      return state;
  }
}
