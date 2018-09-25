import { GET_EXAMENES_INSCRITO } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_EXAMENES_INSCRITO:
      return action.payload.data;
    default:
      return state;
  }
}
