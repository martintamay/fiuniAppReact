import { GET_MATERIAS_A_CARGO, SET_PROFESOR_MATERIA } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_MATERIAS_A_CARGO:
      return action.payload.data.sort((a, b) => { return a.name > b.name });
    case SET_PROFESOR_MATERIA:
      if(state!==null) {
        console.log("materias a cargo agregado", [...state, action.payload.data]);
        return [...state, action.payload.data].sort((a, b) => { return a.name > b.name });
      }
      return state;
    default:
      return state;
  }
}
