import React, { Component } from 'react';
import { loguear } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

class CargarProfesor extends Component {
  constructor(props){
    super(props);

    this.state = {
      nombre: "",
      ci: "",
      correo: "",
      contrasenha: ""
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeHandler(event){
    let input = event.target;
    switch (input.name) {
      case "nombre":
          this.setState({ nombre: input.value });
        break;
      case "ci":
          this.setState({ ci: input.value });
        break;
      case "correo":
          this.setState({ correo: input.value });
        break;
      case "contrasenha":
          this.setState({ contrasenha: input.value });
        break;
      default:

    }
  }

  error(mensaje){
    NotificationManager.error(mensaje);
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

  onSubmit(event){
    event.preventDefault();
    if(this.comprobarCampos()){
      console.log("profesor", {
        professor: {
          person: {
            names: this.state.nombre,
            email: `${this.state.correo}@fiuni.edu.py`,
            password: this.state.contrasenha,
            ci: this.state.ci
          }
        }
      });
    }
  }

  render(){
    return (
      <section id="carga-profesor">
        <div className="container card">
          <h1>Nuevo Profesor</h1>
          <hr/>

          <form autoComplete="nope" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col">
                <label htmlFor="inputProfesor" className="col-sm-2 ">Nombre Completo</label>
                <input type="text"
                  className="form-control"
                  id="inputProfesor"
                  placeholder="nombre"
                  name="nombre"
                  value={this.state.nombre}
                  onChange={this.onChangeHandler} />

                <label htmlFor="inputCI" className="col-sm-2 ">CI</label>
                <input type="number"
                  className="form-control"
                  id="inputCI"
                  placeholder="CI"
                  name="ci"
                  value={this.state.ci}
                  onChange={this.onChangeHandler} />

                <label htmlFor="inputCorreo" className="col-sm-2 ">Correo</label>
                <div className="input-group">
                  <input type="text"
                    className="form-control"
                    id="inputCorreo"
                    placeholder="correo"
                    name="correo"
                    value={this.state.correo}
                    onChange={this.onChangeHandler} />
                  <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2">@fiuni.edu.py</span>
                  </div>
                </div>

                <label htmlFor="inputContrasenha" className="col-sm-2 ">Contraseña</label>
                <input type="password"
                  className="form-control"
                  id="inputContrasenha"
                  placeholder="Contraseña"
                  name="contrasenha"
                  value={this.state.contrasenha}
                  onChange={this.onChangeHandler}/>
              </div>
            </div>
            <hr />
            <div className="float-right ml-auto">
              <button className="btn btn-primary">Guardar</button>
              <Link className="btn btn-secondary" to="/">Cancelar</Link>
            </div>
          </form>
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
