import React, { Component } from 'react';
import { updateEstudiante, getEstudiante } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FormEstudiante from '../forms/form-estudiante';

class EditarEstudiante extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.estudiante===null ||
      this.props.estudiante.id!==Number(this.props.match.params.estudiante_id)){
      this.props.getEstudiante(this.props.match.params.estudiante_id);
    }
  }

  onSubmit(estudiante){
    console.log("estudiante", estudiante);
    this.props.updateEstudiante(estudiante);
  }

  render(){
    console.log("estudiante", this.props);
    if(this.props.estudiante===null ||
      this.props.estudiante.id!==Number(this.props.match.params.estudiante_id)){
      return (
        <section id="editar-estudiante">
          <div className="container card">
            <h1>Editar Estudiante</h1>
            <hr/>
            Cargando...
          </div>
        </section>
      );
    }

    return (
      <section id="carga-estudiante">
        <div className="container card">
          <h1>Editar Estudiante</h1>
          <hr/>

          <FormEstudiante onSubmit={this.onSubmit} estudiante={this.props.estudiante} />
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
    getEstudiante: getEstudiante,
    updateEstudiante: updateEstudiante
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditarEstudiante);
