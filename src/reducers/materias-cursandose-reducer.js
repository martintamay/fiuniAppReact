import { GET_MATERIAS_CURSANDOSE } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_MATERIAS_CURSANDOSE:
      return action.payload;
    default:
      return state;
  }
}
