import { GET_EXAMENES_DISPONIBLES } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_EXAMENES_DISPONIBLES:
      return action.payload.data;
    default:
      return state;
  }
}
