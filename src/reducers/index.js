import { combineReducers } from 'redux';

import notasPorAprobarReducer from './notas-por-aprobar-reducer';
import materiasCursandoseReducer from './materias-cursandose-reducer';
import materiasACargoReducer from './materias-a-cargo-reducer';
import materiasReducer from './materias-reducer';
import notasReducer from './notas-reducer';
import usuarioReducer from './usuario-reducer';
import alumnosParaCargaReducer from './alumnos-para-carga-reducer';


const rootReducer = combineReducers(
  {
    usuario: usuarioReducer,
    notasPorAprobar: notasPorAprobarReducer,
    notas: notasReducer,
    materias: materiasReducer,
    materiasCursandose: materiasCursandoseReducer,
    materiasACargo: materiasACargoReducer,
    alumnosParaCargar: alumnosParaCargaReducer
  }
);

export default rootReducer;
