import { GET_ALUMNOS_PARA_CARGA } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_ALUMNOS_PARA_CARGA:
      return action.payload;
    default:
      return state;
  }
}
