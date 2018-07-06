import { GET_NOTAS } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_NOTAS:
      return action.payload;
    default:
      return state;
  }
}
