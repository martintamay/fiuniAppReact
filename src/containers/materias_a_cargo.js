import React, { Component } from 'react';
import { getMateriasACargo } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MateriasACargo extends Component {
  componentDidMount(){
    /*if(this.props.usuario===null || this.props.usuario===undefined){
      if(localStorage.getItem("session_token")!=null){
        this.props.recuperarLogueo(localStorage.getItem("session_token"));
      }
    }*/
    this.props.getMateriasACargo(this.props.match.params.user_id);
  }

  renderMaterias(){
    let materias = this.props.materiasACargo;
    return materias.map((materia)=>{
      return (
        <Link className="list-group-item list-group-item-action"
          key={materia.id}
          to={`/materias/${materia.id}/cargar-notas`} >
          {materia.name}
        </Link>
      );
    });
  }

  render(){
    if(this.props.materiasACargo===null){
      return (
        <section id="materias-a-cargo">
          <div className="container card">
            <h1>Materias A Cargo</h1>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Cargando
              </li>
            </ul>
          </div>
        </section>
      );
    }
    return (
      <section id="materias-a-cargo">
        <div className="container card">
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

function mapStateToProps({ materiasACargo }) {
  return { materiasACargo };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMateriasACargo: getMateriasACargo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MateriasACargo);
