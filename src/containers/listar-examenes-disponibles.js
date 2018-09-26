import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { getMaterias, getExamenesDisponibles, getCursadasAlumno, inscribirExamen } from '../actions';

import GridExamenesDisponibles from '../grids/grid-examenes-disponibles'

class ListarExamenesDisponibles extends Component {
  constructor(props){
    super(props);
    this.inscribir = this.inscribir.bind(this);
  }
  componentDidMount(){
    if(this.props.match.params.estudiante_id!==undefined){
      this.props.getExamenesDisponibles(this.props.match.params.estudiante_id);
      this.props.getMaterias(this.props.match.params.estudiante_id);
      this.props.getCursadasAlumno(this.props.match.params.estudiante_id);
    }
  }

  inscribir(examen){
    let cursada = this.props.cursadas.find((cur)=>{
      return cur.subject.id === examen.subject.id;
    })
    this.props.inscribirExamen(examen.id, cursada.id);
  }

  render(){
    if(this.props.examenes===null || this.props.materias===null || this.props.cursadas===null){
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
          <h2>Lista de Examenes Disponibles</h2>
          <hr />
          <GridExamenesDisponibles
            examenes={this.props.examenes_disponibles}
            materias={this.props.materias}
            inscribir={this.inscribir}/>
          <div className="btn-group ml-auto">
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

function mapStateToProps({ materias, examenes_disponibles, cursadas }) {
  return { materias, examenes_disponibles, cursadas };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMaterias: getMaterias,
    getExamenesDisponibles: getExamenesDisponibles,
    getCursadasAlumno: getCursadasAlumno,
    inscribirExamen: inscribirExamen
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarExamenesDisponibles);
