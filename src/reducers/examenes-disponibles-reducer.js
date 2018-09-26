import { GET_EXAMENES_DISPONIBLES, INSCRIPCION_ALUMNO } from '../actions';
import { error } from '../utils';

export default function(state=null, action){
  switch (action.type) {
    case GET_EXAMENES_DISPONIBLES:
      return action.payload.data;
    case INSCRIPCION_ALUMNO:
      if(action.payload.response===undefined){
        let data = JSON.parse(JSON.stringify(state));
        let pos = data.findIndex((examen)=>{
          return examen.id === action.payload.data.examination_id
        });
        data.splice(pos, 1);
        return data;
      }else{
        error("Ocurrió un error al inscribirse al examen");
        return state;
      }
    default:
      return state;
  }
}
