import { combineReducers } from 'redux';

import notasPorAprobarReducer from './notas-por-aprobar-reducer';
import materiasCursandoseReducer from './materias-cursandose-reducer';
import materiasACargoReducer from './materias-a-cargo-reducer';
import materiasReducer from './materias-reducer';
import carrerasReducer from './carreras-reducer';
import notasReducer from './notas-reducer';
import usuarioReducer from './usuario-reducer';
import alumnoReducer from './alumno-reducer';
import alumnosParaCargaReducer from './alumnos-para-carga-reducer';
import listaNotasMateriaReducer from './notas-materias-reducer';


const rootReducer = combineReducers(
  {
    usuario: usuarioReducer,
    notasPorAprobar: notasPorAprobarReducer,
    notas: notasReducer,
    materias: materiasReducer,
    carreras: carrerasReducer,
    materiasCursandose: materiasCursandoseReducer,
    materiasACargo: materiasACargoReducer,
    alumnosParaCargar: alumnosParaCargaReducer,
    alumno: alumnoReducer,
    listaNotasMateria: listaNotasMateriaReducer
  }
);

export default rootReducer;
