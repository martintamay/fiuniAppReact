import React, { Component } from 'react';
import { updateProfesor, getProfesor } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FormProfesor from '../forms/form-profesor';

class EditarProfesor extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.profesor===null ||
      this.props.profesor.id!==Number(this.props.match.params.profesor_id)){
      this.props.getProfesor(this.props.match.params.profesor_id);
    }
  }

  onSubmit(profesor){
    console.log("profesor", profesor);
    this.props.updateProfesor(profesor);
  }

  render(){
    console.log("profesor", this.props);
    if(this.props.profesor===null ||
      this.props.profesor.id!==Number(this.props.match.params.profesor_id)){
      return (
        <section id="editar-profesor">
          <div className="container card">
            <h1>Editar Profesor</h1>
            <hr/>
            Cargando...
          </div>
        </section>
      );
    }

    return (
      <section id="carga-profesor">
        <div className="container card">
          <h1>Editar Profesor</h1>
          <hr/>

          <FormProfesor onSubmit={this.onSubmit} profesor={this.props.profesor} />
        </div>
      </section>
    );
  }
}

function mapStateToProps({ profesor }) {
  return { profesor };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getProfesor: getProfesor,
    updateProfesor: updateProfesor
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditarProfesor);
