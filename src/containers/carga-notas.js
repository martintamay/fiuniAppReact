import React, { Component } from 'react';
import { getMateriasACargo, getAlumnosParaCarga } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * TODO: Terminar
 */

class CargaNotas extends Component {
  componentDidMount(){
    /*if(this.props.usuario===null || this.props.usuario===undefined){
      if(localStorage.getItem("session_token")!=null){
        this.props.recuperarLogueo(localStorage.getItem("session_token"));
      }
    }*/
    this.props.getAlumnosParaCarga(this.props.match.params.materia_id);
  }

  render(){
    if(this.props.alumnosParaCarga===null){
      return (
        <section id="materias-cursandose">
          <div className="container">
            <h1>Carga Notas</h1>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Cargando...
              </li>
            </ul>
          </div>
        </section>
      );
    }
    return (
      <section id="materias-cursandose">
        <div className="container">
          <h1>Materias A Cargo</h1>
          <ul className="list-group lista-materias">
            {this.renderMaterias()}
          </ul>
          <small className="font-weight-bold">
            *Haga click en la materia para ir a ella y ver los estudiantes o
            hacer cambios
          </small>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ alumnosParaCarga }) {
  return { alumnosParaCarga };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMateriasACargo: getMateriasACargo,
    getAlumnosParaCarga: getAlumnosParaCarga
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CargaNotas);
