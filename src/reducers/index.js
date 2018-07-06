import { combineReducers } from 'redux';

import notasPorAprobarReducer from './notas-por-aprobar-reducer';
import materiasCursandoseReducer from './materias-cursandose-reducer';
import materiasACargoReducer from './materias-a-cargo-reducer';
import materiasReducer from './materias-reducer';
import notasReducer from './notas-reducer';
import alumnosParaCargaReducer from './alumnos-para-carga-reducer';

function prueba(state, action){
  return {};
}

const rootReducer = combineReducers(
  {
    usuario: prueba,
    notasPorAprobar: notasPorAprobarReducer,
    notas: notasReducer,
    materias: materiasReducer,
    materiasCursandose: materiasCursandoseReducer,
    materiasACargo: materiasACargoReducer,
    alumnosParaCarga: alumnosParaCargaReducer
  }
);

export default rootReducer;
