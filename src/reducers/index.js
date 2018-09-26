import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar'

import examenesPorAprobarReducer from './examenes-por-aprobar-reducer';
import examenReducer from './examen-reducer';
import examenesReducer from './examenes-reducer';
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
import estudiantesReducer from './estudiantes-reducer';
import examenesInscritoReducer from './examenes-inscrito-reducer';
import examenesDisponiblesReducer from './examenes-disponibles-reducer';
import cursadasReducer from './cursadas-reducer';


const rootReducer = combineReducers(
  {
    usuario: usuarioReducer,
    examen: examenReducer,
    examenes: examenesReducer,
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
    cursadas: cursadasReducer,
    loadingBar: loadingBarReducer,
    listaNotasMateria: listaNotasMateriaReducer,
    examenes_inscrito: examenesInscritoReducer,
    examenes_disponibles: examenesDisponiblesReducer
  }
);

export default rootReducer;
