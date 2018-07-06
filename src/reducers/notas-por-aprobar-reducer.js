import { GET_NOTAS_POR_APROBAR } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_NOTAS_POR_APROBAR:
      return action.payload;
    default:
      return state;
  }
}
