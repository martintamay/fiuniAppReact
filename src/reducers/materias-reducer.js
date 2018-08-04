import { GET_MATERIAS } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_MATERIAS:
      let materias = {};

      action.payload.data.forEach((materia)=>{
        materias[materia.id] = materia;
      });
      return materias;
    default:
      return state;
  }
}
