import { GET_NOTAS } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_NOTAS:
      if(action.payload.data!==undefined)
        return action.payload.data;
      else
        return state;
    default:
      return state;
  }
}
