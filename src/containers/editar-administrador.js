import React, { Component } from 'react';
import { updateAdministrador, getAdministrador } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MateriasACargo from '../containers/materias_a_cargo';
import FormAdministrador from '../forms/form-administrador';
import { isAdmin } from '../utils';

class EditarAdministrador extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.administrador===null ||
      this.props.administrador.id!==Number(this.props.match.params.administrador_id)){
      this.props.getAdministrador(this.props.match.params.administrador_id);
    }
  }

  onSubmit(administrador){
    this.props.updateAdministrador(administrador);
  }

  render(){
    if(this.props.administrador===null ||
      this.props.administrador.id!==Number(this.props.match.params.administrador_id)){
      return (
        <section id="editar-administrador">
          <div className="container card">
            <h1>Editar Administrador</h1>
            <hr/>
            Cargando...
          </div>
        </section>
      );
    }

    return (
      <div>
        <section id="editar-administrador">
          <div className="container card">
            <h1>Editar Administrador</h1>
            <hr/>

            <FormAdministrador onSubmit={this.onSubmit} administrador={this.props.administrador} />
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps({ administrador, usuario }) {
  return { administrador, usuario };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAdministrador: getAdministrador,
    updateAdministrador: updateAdministrador
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditarAdministrador);
