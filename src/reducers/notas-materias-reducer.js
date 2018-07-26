import { NOTAS_MATERIAS } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case NOTAS_MATERIAS:
      if(action.payload.data===undefined) return "Error";
      return action.payload.data;
    default:
      return state;
  }
}
