import React, { Component } from 'react';
import { updateExamen, getExamen } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FormExamen from '../forms/form-examen';

class EditarExamen extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.examen===null ||
      this.props.examen.id!==Number(this.props.match.params.examen_id)){
      this.props.getExamen(this.props.match.params.examen_id);
    }
  }


  onSubmit(examen){
    this.props.updateExamen(examen);
  }

  render(){
    if(this.props.examen===null ||
      this.props.examen.id!==Number(this.props.match.params.examen_id)){
      return (
        <section id="editar-examen">
          <div className="container card">
            <h1>Editar Examen</h1>
            <hr/>
            Cargando...
          </div>
        </section>
      );
    }
    return (
      <section id="editar-examen">
          <div className="container card">
            <h1>Editar Examen</h1>
            <hr />
            <FormExamen onSubmit={this.onSubmit} examen={this.props.examen} />
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
    updateExamen: updateExamen,
    getExamen: getExamen
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditarExamen);
