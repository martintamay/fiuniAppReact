import React, { Component } from 'react';
import { createAdministrador, resetAdministrador } from '../actions';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FormAdministrador from '../forms/form-administrador';

class CargarAdministrador extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    this.props.resetAdministrador();
  }

  onSubmit(administrador){
    this.props.createAdministrador(administrador);
  }

  render(){
    if(this.props.administrador!==null){
      return <Redirect to={`/administradores/${this.props.administrador.id}/editar`} />
    }
    return (
      <section id="carga-administrador">
        <div className="container card">
          <h1>Nuevo Administrador</h1>
          <hr/>

          <FormAdministrador onSubmit={this.onSubmit} />
        </div>
      </section>
    );
  }
}

function mapStateToProps({ administrador }) {
  return { administrador };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createAdministrador: createAdministrador,
    resetAdministrador: resetAdministrador
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CargarAdministrador);
