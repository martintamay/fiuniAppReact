import React, { Component } from 'react';
import { createProfesor, resetProfesor } from '../actions';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FormProfesor from '../forms/form-profesor';

class CargarProfesor extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    this.props.resetProfesor();
  }

  onSubmit(profesor){
    this.props.createProfesor(profesor);
  }

  render(){
    if(this.props.profesor!==null){
      return <Redirect to={`/profesores/${this.props.profesor.id}/editar`} />
    }
    return (
      <section id="carga-profesor">
        <div className="container card">
          <h1>Nuevo Profesor</h1>
          <hr/>

          <FormProfesor onSubmit={this.onSubmit} />
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
    createProfesor: createProfesor,
    resetProfesor: resetProfesor
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CargarProfesor);
