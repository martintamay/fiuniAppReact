import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar'

import examenesPorAprobarReducer from './examenes-por-aprobar-reducer';
import examenReducer from './examen-reducer';
import materiasCursandoseReducer from './materias-cursandose-reducer';
import materiasACargoReducer from './materias-a-cargo-reducer';
import materiasReducer from './materias-reducer';
import materiaReducer from './materia-reducer';
import carrerasReducer from './carreras-reducer';
import notasReducer from './notas-reducer';
import profesoresReducer from './profesores-reducer';
import profesorReducer from './profesor-reducer';
import usuarioReducer from './usuario-reducer';
import estudianteReducer from './estudiante-reducer';
import estudiantesParaCargaReducer from './estudiantes-para-carga-reducer';
import listaNotasMateriaReducer from './notas-materias-reducer';
import notificationsManager from './notifications-manager';
import estudiantesReducer from './estudiantes-reducer';


const rootReducer = combineReducers(
  {
    usuario: usuarioReducer,
    examen: examenReducer,
    examenesPorAprobar: examenesPorAprobarReducer,
    notas: notasReducer,
    materias: materiasReducer,
    materia: materiaReducer,
    carreras: carrerasReducer,
    profesores: profesoresReducer,
    profesor: profesorReducer,
    estudiantes: estudiantesReducer,
    materiasCursandose: materiasCursandoseReducer,
    materiasACargo: materiasACargoReducer,
    estudiantesParaCargar: estudiantesParaCargaReducer,
    estudiante: estudianteReducer,
    loadingBar: loadingBarReducer,
    listaNotasMateria: listaNotasMateriaReducer
  }
);

export default rootReducer;
