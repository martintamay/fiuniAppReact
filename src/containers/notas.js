import React, { Component } from 'react';
import { getNotas, getMaterias, getEstudiante } from '../actions';
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
    this.props.getNotas(this.props.match.params.estudiante_id);
    this.props.getMaterias(this.props.match.params.estudiante_id);
    this.props.getEstudiante(this.props.match.params.estudiante_id);
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
      if (materias[nota.examination.examination_date.substring(0, 4)]===undefined) {
        materias[nota.examination.examination_date.substring(0, 4)] = {};
      }
      if(materias[nota.examination.examination_date.substring(0, 4)][nota.subject.id]===undefined){
        materias[nota.examination.examination_date.substring(0, 4)][nota.subject.id] = [];
      }
      materias[nota.examination.examination_date.substring(0, 4)][nota.subject.id].push({
        id: nota.id,
        tipo: nota.examination.examination_type==="PP"?"Puntos Parciales":"Final",
        oportunidad: nota.opportunity,
        puntaje: nota.score,
        porcentaje: nota.percentage,
        fecha: nota.examination.examination_date
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
    if (this.state.notasPorMateria===null || this.props.materias===null || this.props.estudiante===null) {
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
    if (this.props.notas.length === 0) {
        return (
          <section id="notas">
            <div className="container card">
              <h1>Notas - {this.props.estudiante.person.names}</h1>
              <hr />
              <div className="card">
                <div className="card-header">
                  Sin notas que mostrar
                </div>
              </div>
            </div>
          </section>
        );
    }
    return (
      <section id="notas">
        <div className="container card">
          <h1>Notas - {this.props.estudiante.person.names}</h1>
          <hr />
          <div className="card">
            {this.renderNotas(this.state.notasPorMateria)}
          </div>
          <div className="btn btn-group">
            {
              this.props.usuario.administrator.id!==undefined ?

              <div className="float-right ml-auto">
                <button
                  onClick={()=>this.props.history.goBack()}
                  type="button"
                  className="btn btn-light float-right">
                  Volver
                </button>
              </div> : ""
            }
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ usuario, notas, materias, estudiante }) {
  return { usuario, notas, materias, estudiante };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getNotas: getNotas,
    getMaterias: getMaterias,
    getEstudiante: getEstudiante
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Notas);
