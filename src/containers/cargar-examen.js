import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createExamen } from '../actions';
import FormExamen from '../forms/form-examen';

class CargarExamen extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(examen){
    this.props.createExamen(examen);
  }

  render(){
    if(this.props.examen!==null){
      return <Redirect to={`/examenes`} />
    }
    return (
      <section id="carga-examen">
          <div className="container card">
            <h1>Nuevo Examen</h1>
            <hr />
            <FormExamen onSubmit={this.onSubmit}/>
          </div>
      </section>
    );
  }
}

function mapStateToProps({ examen }) {
  return { examen };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createExamen: createExamen
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CargarExamen);
