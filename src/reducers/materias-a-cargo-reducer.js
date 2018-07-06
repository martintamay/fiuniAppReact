import { GET_MATERIAS_A_CARGO } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_MATERIAS_A_CARGO:
      return action.payload;
    default:
      return state;
  }
}
