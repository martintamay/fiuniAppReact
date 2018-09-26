import { GET_EXAMENES_INSCRIPTO, DEL_EXAMENES_INSCRIPTO } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_EXAMENES_INSCRIPTO:
      return action.payload.data;
    case DEL_EXAMENES_INSCRIPTO:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
}
