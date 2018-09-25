import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createMateria } from '../actions';
import FormMateria from '../forms/form-materia';

class CargarMateria extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(materia){
    this.props.createMateria(materia);
  }

  render(){
    if(this.props.materia!==null){
      return <Redirect to={`/materias`} />
    }
    return (
      <section id="carga-materia">
          <div className="container card">
            <h1>Nueva Materia</h1>
            <hr />
            <FormMateria onSubmit={this.onSubmit}/>
          </div>
      </section>
    );
  }
}

function mapStateToProps({ materia }) {
  return { materia };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createMateria: createMateria
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CargarMateria);
