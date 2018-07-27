import { GET_MATERIAS_CURSANDOSE } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_MATERIAS_CURSANDOSE:
      if (action.payload.data !== undefined) {
        return action.payload.data;
      } else {
        return state;
      }
    default:
      return state;
  }
}
