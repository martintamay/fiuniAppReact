import { GET_CURSADAS_ESTUDIANTE } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_CURSADAS_ESTUDIANTE:
      return action.payload.data;
    default:
      return state;
  }
}
