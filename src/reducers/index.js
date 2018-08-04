import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar'

import examenesPorAprobarReducer from './examenes-por-aprobar-reducer';
import materiasCursandoseReducer from './materias-cursandose-reducer';
import materiasACargoReducer from './materias-a-cargo-reducer';
import materiasReducer from './materias-reducer';
import carrerasReducer from './carreras-reducer';
import notasReducer from './notas-reducer';
import profesoresReducer from './profesores-reducer';
import usuarioReducer from './usuario-reducer';
import alumnoReducer from './alumno-reducer';
import alumnosParaCargaReducer from './alumnos-para-carga-reducer';
import listaNotasMateriaReducer from './notas-materias-reducer';
import notificationsManager from './notifications-manager';


const rootReducer = combineReducers(
  {
    usuario: usuarioReducer,
    examenesPorAprobar: examenesPorAprobarReducer,
    notas: notasReducer,
    materias: materiasReducer,
    carreras: carrerasReducer,
    profesores: profesoresReducer,
    materiasCursandose: materiasCursandoseReducer,
    materiasACargo: materiasACargoReducer,
    alumnosParaCargar: alumnosParaCargaReducer,
    alumno: alumnoReducer,
    loadingBar: loadingBarReducer,
    listaNotasMateria: listaNotasMateriaReducer,
    notificationsManager: notificationsManager
  }
);

export default rootReducer;
