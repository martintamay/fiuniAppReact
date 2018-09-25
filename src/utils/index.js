import { NotificationManager } from 'react-notifications';

export function alert(mensaje, titulo, timeout, callback, priority){
  NotificationManager.warning(mensaje, titulo, timeout, callback, priority);
}
export function error(mensaje, titulo, timeout, callback, priority){
  NotificationManager.error(mensaje, titulo, timeout, callback, priority);
}
export function success(mensaje, titulo, timeout, callback, priority){
  NotificationManager.success(mensaje, titulo, timeout, callback, priority);
}
export function info(mensaje, titulo, timeout, callback, priority){
  NotificationManager.info(mensaje, titulo, timeout, callback, priority);
}

export function isAdmin(usr) {
  return usr!==undefined && usr!==null && usr.administrator!==undefined && usr.administrator!==null && usr.administrator.id!==undefined;
}
