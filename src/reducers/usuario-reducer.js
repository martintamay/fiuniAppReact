import { NotificationManager } from 'react-notifications';

import { LOGIN_REQ, ERRLOGIN, RELOGIN_REQ } from '../actions';

export default function(state=null, action){
  if (action.payload !== undefined &&
    action.payload.response !== undefined &&
    action.payload.response.status !== undefined &&
    action.payload.response.status === 404) {
    NotificationManager.error("Sin internet o servidor no disponible");
  }

  switch (action.type) {
    case LOGIN_REQ:
      if (action.payload.data!==undefined){
        if (localStorage.getItem("session_token")!==null) {
          localStorage.setItem("session_token", action.payload.data.session_token);
        } else {
          sessionStorage.setItem("session_token", action.payload.data.session_token);
        }
        return action.payload.data;
      } else if (action.payload.response.status === 401) {
        if (!window.location.pathname.includes('login')){
          window.location.pathname = '/login';
        } else {
          NotificationManager.warning("Usuario o contraseña incorrectos");
        }
        return state;
      } else if (action.payload.response.status === 404) {
        return state;
      } else {
        NotificationManager.error("Error desconocido");
        return state;
      }
    case RELOGIN_REQ:
      if(action.payload.status===401){
        alert("No tienes permisos para realizar esta acción");
        if (!window.location.pathname.includes('login')){
          window.location.pathname = '/login';
        } else {
          NotificationManager.warning("Usuario o contraseña incorrectos");
        }
      }
      if (action.payload.data!==undefined && action.payload.data!==null){
        if (localStorage.getItem("session_token")!==null) {
          localStorage.setItem("session_token", action.payload.data.session_token);
        } else {
          sessionStorage.setItem("session_token", action.payload.data.session_token);
        }
        return action.payload.data;
      }
      return state;
    case ERRLOGIN:
      return action.payload;
    default:
      return state;
  }
}
