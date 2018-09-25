import React, { Component } from 'react';
import { updateProfesor, getProfesor } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MateriasACargo from '../containers/materias_a_cargo';
import FormProfesor from '../forms/form-profesor';
import { isAdmin } from '../utils';

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
    this.props.updateProfesor(profesor);
  }

  render(){
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
      <div>
        <section id="editar-profesor">
          <div className="container card">
            <h1>Editar Profesor</h1>
            <hr/>

            <FormProfesor onSubmit={this.onSubmit} profesor={this.props.profesor} />
          </div>
        </section>
        { isAdmin(this.props.usuario) ? <hr /> : "" }
        { isAdmin(this.props.usuario) ? <MateriasACargo match={this.props.match} /> : "" }
      </div>
    );
  }
}

function mapStateToProps({ profesor, usuario }) {
  return { profesor, usuario };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getProfesor: getProfesor,
    updateProfesor: updateProfesor
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditarProfesor);
