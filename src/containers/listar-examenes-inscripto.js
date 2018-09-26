import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { getMaterias, getExamenesInscripto, getCursadasAlumno, inscribirExamen, deleteExamenesInscripto } from '../actions';
import { Link } from 'react-router-dom';

import GridExamenesInscripto from '../grids/grid-examenes-inscripto'

class ListarExamenesIncripto extends Component {
  constructor(props){
    super(props);
    this.eliminar = this.eliminar.bind(this);
  }

  componentDidMount(){
    if(this.props.match.params.estudiante_id!==undefined){
      this.props.getExamenesInscripto(this.props.match.params.estudiante_id);
      this.props.getMaterias(this.props.match.params.estudiante_id);
    }
  }

  eliminar(examen_inscripto){
    this.props.deleteExamenesInscripto(examen_inscripto.id);
  }

  render(){
    if(this.props.examenes_inscripto===null || this.props.materias===null){
      return (
        <section id="notas-materia">
          <div className="container card">
            <h2 className="card-title">Cargando...</h2>

            <div className="float-right ml-auto">
              <button
                onClick={()=>this.props.history.goBack()}
                type="button"
                className="btn btn-secondary">
                Volver
              </button>
            </div>
          </div>
        </section>
      );
    }
    console.log("cursadas", this.props.cursadas);
    return (
      <section id="carga-materia">
        <div className="container card">
          <h2>Lista de Examenes Inscripto</h2>
          <hr />
          <GridExamenesInscripto
            examenes={this.props.examenes_inscripto}
            materias={this.props.materias}
            eliminar={this.eliminar}/>
          <div className="btn-group ml-auto">
            <Link className="btn btn-primary" to={`/estudiantes/${this.props.match.params.estudiante_id}/examenes/inscribirse`}>
              Inscribirse Examen
            </Link>
            <button
              className="btn btn-light"
              onClick={() => this.props.history.goBack()}>
              Volver
            </button>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ materias, examenes_inscripto }) {
  return { materias, examenes_inscripto };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMaterias: getMaterias,
    getExamenesInscripto: getExamenesInscripto,
    getCursadasAlumno: getCursadasAlumno,
    inscribirExamen: inscribirExamen,
    deleteExamenesInscripto: deleteExamenesInscripto
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarExamenesIncripto);
