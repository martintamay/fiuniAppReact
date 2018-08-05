import React, { Component } from 'react';
import { loguear } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormProfesor from '../forms/form-profesor';

class CargarProfesor extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  comprobarCampos(){
    let check = true;
    if (this.state.nombre==="") {
      this.error("Introduzca un nombre válido");
      check = false;
    } else if (this.state.correo==="") {
      this.error("Introduzca un correo válido");
      check = false;
    } else if (this.state.ci==="") {
      this.error("Introduzca un ci válido");
      check = false;
    } else if (this.state.contrasenha==="") {
      this.error("Introduzca una contraseña válida");
      check = false;
    }
    return check;
  }

  onSubmit(profesor){
    console.log("profesor", profesor);
  }

  render(){
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

function mapStateToProps({ usuario }) {
  return { usuario };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loguear: loguear
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CargarProfesor);
