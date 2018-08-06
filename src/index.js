import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import LoadingBar, { loadingBarMiddleware } from 'react-redux-loading-bar';
import isMobile from 'is-mobile';

import reducers from './reducers';

import Prueba from './components/prueba';

import Menu from './containers/menu';
import Notas from './containers/notas';
import NotasPorAprobar from './containers/notas_por_aprobar';
import MateriasCursandose from './containers/materias_cursandose';
import MateriasACargo from './containers/materias_a_cargo';
import CargaNotas from './containers/carga-notas';
import Login from './containers/login';
import CargarEstudiante from './containers/cargar-estudiante';
import EditarEstudiante from './containers/editar-estudiante';
import CargarMateria from './containers/cargar-materia';
import EditarMateria from './containers/editar-materia';
import CargarProfesor from './containers/cargar-profesor';
import EditarProfesor from './containers/editar-profesor';
import CargarExamen from './containers/cargar-examen';
import EditarExamen from './containers/editar-examen';
import ListaNotasMaterias from './containers/lista-notas';
import ListarMaterias from './containers/listar-materias';
import ListarCarreras from './containers/listar-carreras';
import ListarProfesores from './containers/listar-profesores';
import ListarEstudiantes from './containers/listar-estudiantes';

export const develop = window.location.hostname==="localhost";

/*si no ingresó por https le redirige a https*/
if (!develop && window.location.protocol !== 'https:') {
  if (develop===true) console.log("redireccionado a https");
  else window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, loadingBarMiddleware())(createStore);


if(isMobile()){
  function SinImplementar(props){
    return (
      <section id="mobile">
        <div className="container">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">Aún no implementado</div>
            <div className="card-body">
              <h5 className="card-title">Lo sentimos</h5>
              <p className="card-text">La implementación de esta app para celulares está en progreso.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div>
          <Route path="/" component={SinImplementar} />
        </div>
      </BrowserRouter>
    </Provider>
    , document.querySelector('#APP'));
} else {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div className="super-container">
          <Route path="/" component={Menu} />
          <Route path="/" component={LoadingBar} />

          <Switch>
            <Route path="/notas" component={Notas} />
            <Route path="/estudiantes/nuevo" component={CargarEstudiante} />
            <Route path="/estudiantes/:estudiante_id/editar" component={EditarEstudiante} />
            <Route path="/materias-a-cargo" component={MateriasACargo} />
            <Route path="/materias/nuevo" component={CargarMateria} />
            <Route path="/materias/:materia_id/cargar-notas" component={CargaNotas} />
            <Route path="/materias/:materia_id/notas" component={ListaNotasMaterias} />
            <Route path="/materias/:materia_id/editar" component={EditarMateria} />
            <Route path="/materias/:user_id" component={MateriasCursandose} />
            <Route path="/materias" component={ListarMaterias} />
            <Route path="/examenes/nuevo" component={CargarExamen} />
            <Route path="/examenes/:examen_id/editar" component={EditarExamen} />
            <Route path="/carreras" component={ListarCarreras} />
            <Route path="/profesores/nuevo" component={CargarProfesor} />
            <Route path="/profesores/:profesor_id/editar" component={EditarProfesor} />
            <Route path="/profesores" component={ListarProfesores} />
            <Route path="/estudiantes" component={ListarEstudiantes} />
            <Route path="/por-aprobar" component={NotasPorAprobar} />
            <Route path="/profesor/:idprofesor" component={CargarProfesor} />
            <Route path="/prueba" component={Prueba} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
    , document.querySelector('#APP'));
}
