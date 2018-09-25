import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import GridExamenesInscrito from '../grids/grid-examenes-inscrito';
import GridExamenesDisponibles from '../grids/grid-examenes-disponibles';
import { getMaterias, getExamenesInscrito, getExamenesDisponibles, reloguin } from '../actions';

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
      this.props.getExamenesInscrito(this.props.usuario.student.id);
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
    if(this.props.materias===null || this.props.examenes_inscrito===null || this.props.examenes_disponibles===null || this.props.usuario===null){
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
    console.log("inscrito", this.props.examenes_inscrito);
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
                  Inscrito
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
                  examenes={this.props.examenes_inscrito} />
              </div>
            ) :
            (
              <div>
                <b>Exámenes Actualmente Inscrito</b>
                <GridExamenesInscrito
                  materias={this.props.materias}
                  examenes={this.props.examenes_inscrito} />
              </div>
            )
          }

        </div>
      </section>
    );
  }
}

function mapStateToProps({ usuario, materias, examenes_disponibles, examenes_inscrito }) {
  return { usuario, materias, examenes_disponibles, examenes_inscrito };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMaterias: getMaterias,
    getExamenesDisponibles: getExamenesDisponibles,
    getExamenesInscrito: getExamenesInscrito,
    reloguin: reloguin
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PantallaExamenes);
