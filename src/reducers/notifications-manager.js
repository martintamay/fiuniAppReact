import NotificationManager from 'react-notifications';
import { CARGA_MATERIA } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case CARGA_MATERIA:
      let status = action.payload.response.status;
      if(action.status!==null && action.status===201) NotificationManager.success("Éxito", "Materia agregada exitosamente");
      else if(status===401) NotificationManager.error("No se pudo conectar con el servidor");
      else NotificationManager.error("Error desconocido al agregar la materia");
      break;
    default:

  }

  return state;
}
