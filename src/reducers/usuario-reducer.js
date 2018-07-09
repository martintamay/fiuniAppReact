import { NotificationManager } from 'react-notifications';

import { LOGIN_REQ, RELOGIN } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case LOGIN_REQ:
      if (action.payload.data!==undefined){
        return action.payload.data;
      } else if (action.payload.response.status === 401) {
        NotificationManager.warning("Usuario o contraseña incorrectos");
        return state;
      } else if (action.payload.response.status === 404) {
        NotificationManager.error("Sin internet o servidor no disponible");
        return state;
      } else {
        NotificationManager.error("Error desconocido");
        return state;
      }
    case RELOGIN:
      return action.payload;
    default:
      return state;
  }
}
