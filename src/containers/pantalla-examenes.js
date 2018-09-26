import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import GridExamenesInscripto from '../grids/grid-examenes-inscripto';
import GridExamenesDisponibles from '../grids/grid-examenes-disponibles';
import { getMaterias, getExamenesInscripto, getExamenesDisponibles, reloguin } from '../actions';

class PantallaExamenes extends Component {
  constructor(props){
    super(props);

    this.state = {
      show_disponibles: true
    }

    this.onChangeTab = this.onChangeTab.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    this.props.getMaterias();
    if(this.props.usuario===null){
      this.props.reloguin();
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.usuario === null && this.props.usuario!==null){
      this.props.getExamenesDisponibles(this.props.usuario.student.id);
      this.props.getExamenesInscripto(this.props.usuario.student.id);
    }
  }

  onChangeTab(){
    this.setState({
      show_disponibles: !this.state.show_disponibles
    });
  }

  onSubmit(examen){
    this.props.updateExamen(examen);
  }

  render(){
    if(this.props.materias===null || this.props.examenes_inscripto===null || this.props.examenes_disponibles===null || this.props.usuario===null){
      return (
        <section id="listados-examenes">
          <div className="container card">
            <h1>Listados Exámenes</h1>
            <hr/>
            <p>Cargando</p>
          </div>
        </section>
      );
    }
    if (this.props.usuario.id === undefined){
      return (
        <Redirect to="/login" />
      );
    }
    console.log("inscripto", this.props.examenes_inscripto);
    console.log("disponibles", this.props.examenes_disponibles);
    return (
      <section id="listados-examenes">
        <div className="container card">
          <h1>Exámenes</h1>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className={"nav-link " + (this.state.show_disponibles ? "active" : "") }
                onClick={this.onChangeTab}>
                  Disponibles
              </a>
            </li>
            <li className="nav-item">
              <a className={"nav-link " + (!this.state.show_disponibles ? "active" : "") }
                onClick={this.onChangeTab}>
                  Inscripto
              </a>
            </li>
          </ul>
          {
            this.state.show_disponibles ?
            (
              <div>
                <b>Exámenes Disponibles</b>
                <GridExamenesDisponibles
                  materias={this.props.materias}
                  examenes={this.props.examenes_inscripto} />
              </div>
            ) :
            (
              <div>
                <b>Exámenes Actualmente Inscripto</b>
                <GridExamenesInscripto
                  materias={this.props.materias}
                  examenes={this.props.examenes_inscripto} />
              </div>
            )
          }

        </div>
      </section>
    );
  }
}

function mapStateToProps({ usuario, materias, examenes_disponibles, examenes_inscripto }) {
  return { usuario, materias, examenes_disponibles, examenes_inscripto };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMaterias: getMaterias,
    getExamenesDisponibles: getExamenesDisponibles,
    getExamenesInscripto: getExamenesInscripto,
    reloguin: reloguin
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PantallaExamenes);
