import { GET_EXAMENES } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_EXAMENES:
      return action.payload.data;
    default:
      return state;
  }
}
