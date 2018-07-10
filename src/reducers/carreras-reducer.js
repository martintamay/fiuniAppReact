import { GET_CARRERAS } from '../actions';

export default function(state=null, action){
  switch (action.type) {
    case GET_CARRERAS:
      let carreras = {};

      action.payload.data.forEach((carrera)=>{
        carreras[carrera.id] = carrera;
      });
      return carreras;
    default:
      return state;
  }
}
