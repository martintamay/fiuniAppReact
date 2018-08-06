import { MATERIAS_REQ } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case MATERIAS_REQ:
      let materias = {};

      action.payload.data.forEach((materia)=>{
        materias[materia.id] = materia;
      });
      return materias;
    default:
      return state;
  }
}
