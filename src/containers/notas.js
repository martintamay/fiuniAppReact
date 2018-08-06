import React, { Component } from 'react';
import { getNotas, getMaterias } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NotasListaMateria from '../components/notas-lista-materia';

class Notas extends Component {
  constructor(props){
    super(props);

    this.state = {
      notasPorMateria: null
    }
  }


  componentDidUpdate(prevProps){
    if(prevProps.notas!==this.props.notas){
      this.updateNotasPorMateria();
    }
  }


  componentDidMount(){
    /*if(this.props.usuario===null || this.props.usuario===undefined){
      if(localStorage.getItem("session_token")!=null){
        this.props.recuperarLogueo(localStorage.getItem("session_token"));
      }
    }*/
    this.props.getNotas(this.props.match.params.user_id);
    this.props.getMaterias(this.props.match.params.user_id);
  }


  renderNotas(porAnho){
    let materias = this.props.materias;
    return Object.keys(porAnho).map(function(anho, index) {
      return (
        <NotasListaMateria
          anho={anho}
          notas={porAnho[anho]}
          materias={materias}
          key={anho} />
        );
    });
  }

  updateNotasPorMateria(){
    let materias = {};
    this.props.notas.forEach((nota)=>{
      if (materias[nota.takenDate.substring(0, 4)]===undefined) {
        materias[nota.takenDate.substring(0, 4)] = {};
      }
      if(materias[nota.takenDate.substring(0, 4)][nota.taken.subject_id]===undefined){
        materias[nota.takenDate.substring(0, 4)][nota.taken.subject_id] = [];
      }
      materias[nota.takenDate.substring(0, 4)][nota.taken.subject_id].push({
        id: nota.id,
        tipo: nota.noteType==="PP"?"Puntos Parciales":"Final",
        oportunidad: nota.opportunity,
        puntaje: nota.score,
        porcentaje: nota.percentage,
        fecha: nota.takenDate
      });
    });
    this.setState({ notasPorMateria: materias });
  }

  isLogued(){
    return this.props.usuario!==undefined &&
    this.props.usuario!==null &&
    this.props.usuario.session_token!==undefined &&
    this.props.usuario.session_token!==null;
  }

  render(){
    if (this.state.notasPorMateria===null || this.props.materias===null) {
        return (
          <section id="notas">
            <div className="container card">
              <h1>Notas</h1>
              <hr />
              <div className="card">
                <div className="card-header">
                  Cargando...
                </div>
              </div>
            </div>
          </section>
        );
    }
    return (
      <section id="notas">
        <div className="container card">
          <h1>Notas</h1>
          <hr />
          <div className="card">
            {this.renderNotas(this.state.notasPorMateria)}
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ usuario, notas, materias }) {
  return { usuario, notas, materias };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getNotas: getNotas,
    getMaterias: getMaterias
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Notas);
