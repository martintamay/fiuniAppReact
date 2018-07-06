import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import isMobile from 'is-mobile';

import reducers from './reducers';

import Prueba from './components/prueba';

import Menu from './containers/menu';
import Notas from './containers/notas';
import NotasPorAprobar from './containers/notas_por_aprobar';
import MateriasCursandose from './containers/materias_cursandose';
import MateriasACargo from './containers/materias_a_cargo';

export const develop = window.location.hostname==="localhost";

/*si no ingresó por https le redirige a https*/
if (!develop && window.location.protocol !== 'https:') {
  if (develop===true) console.log("redireccionado a https");
  else window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

if(isMobile()){
  function SinImplementar(props){
    return (
      <section id="mobile">
        <div className="container">
          <div class="card text-white bg-danger mb-3">
            <div class="card-header">Aún no implementado</div>
            <div class="card-body">
              <h5 class="card-title">Lo sentimos</h5>
              <p class="card-text">La implementación de esta app para celulares está en progreso.</p>
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
        <div>
          <Route path="/" component={Menu} />
          <Switch>
            <Route path="/:user_id/notas" component={Notas} />
            <Route path="/:user_id/materias" component={MateriasCursandose} />
            <Route path="/:user_id/materias-a-cargo" component={MateriasACargo} />
            <Route path="/por-aprobar" component={NotasPorAprobar} />
            <Route path="/prueba" component={Prueba} />
            <Route path="/" component={Prueba} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
    , document.querySelector('#APP'));
}
