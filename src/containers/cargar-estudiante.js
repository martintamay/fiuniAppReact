import React, { Component } from 'react';
import { createEstudiante } from '../actions';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FormEstudiante from '../forms/form-estudiante';

class CargarEstudiante extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(datos){
    this.props.createEstudiante(datos);
  }

  render(){
    if(this.props.estudiante!==null){
      return <Redirect to={`/estudiantes/${this.props.estudiante.id}/editar`} />
    }
    return (
      <section id="carga-estudiante">
        <div className="container card">
          <h1>Agregar Alumno</h1>
          <hr/>
          <FormEstudiante onSubmit={this.onSubmit} />
        </div>
      </section>
    );
  }
}

function mapStateToProps({ estudiante }) {
  return { estudiante };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createEstudiante: createEstudiante
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CargarEstudiante);
