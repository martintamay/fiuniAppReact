import React, { Component } from 'react';
import { getCarreras, getAlumno } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

class CargarAlumno extends Component {
  constructor(props){
    super(props);

    this.state = {
      nombre: "",
      ci: "",
      correo: "",
      carrera: 0,
      ingreso: "",
      contrasenha: "",
      edit: false
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.carreras===null){
      this.props.getCarreras();
    }
    if(this.props.match.params.idalumno!==undefined){
      let idalumno = this.props.match.params.idalumno;
      if(this.state.edit!==true){
        this.setState({ edit: true });
        this.props.getAlumno(idalumno);
      }
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.alumno!==undefined && newProps.alumno!==null){
      let al = newProps.alumno;
      this.setState({
          nombre: al.person.names,
          ci: al.person.ci,
          correo: al.person.email,
          carrera: al.career.id,
          ingreso: al.entry_year,
          contrasenha: ""
      });
    }
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
      case "carrera":
          this.setState({ carrera: input.value });
        break;
      case "ingreso":
          this.setState({ ingreso: input.value });
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
    } else if (this.state.ingreso==="") {
      this.error("Introduzca un año de ingreso válido");
      check = false;
    } else if (this.state.carrera==="" || this.state.carrera===0) {
      this.error("Introduzca una carrera válida");
      check = false;
    }
    return check;
  }

  onSubmit(event){
    event.preventDefault();
    if(this.comprobarCampos()){
      console.log("profesor", {
        student: {
          carrer_id: this.state.carrera,
          entry_year: this.state.ingreso,
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

  renderCarrera(){
    let carreras = this.props.carreras;
    if (carreras === null) {
      return <option value="0" key="carr0">Cargando carreras...</option>;
    }

    const sinEsp = <option value="0" key="carr0">Elija una carrera</option>;
    let opCarreras = Object.keys(carreras).map(function(id, index) {
      return (
        <option
          key={id}
          value={id}>
          {carreras[id].description}
        </option>
      );
    });
    return [sinEsp, ...opCarreras];
  }

  render(){

    return (
      <section id="carga-alumno">
        <div className="container card">
          <h1>{this.state.edit?"Editar Alumno":"Agregar Alumno"}</h1>
          <hr/>

          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col">
                <label htmlFor="inputNombre" className="col-sm-2 ">Nombre</label>
                <input type="text"
                  className="form-control"
                  id="inputNombre"
                  placeholder="Nombre"
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

                <label htmlFor="Carrera" className="col-sm-2">Carrera</label>
                <select className="form-control"
                  name="carrera"
                  id="carrera"
                  value={this.state.carrera}
                  onChange={this.onChangeHandler} >
                  {this.renderCarrera()}
                </select>

                <label htmlFor="inputIngreso" className="col-sm-2 ">Ingreso</label>
                <input type="number"
                  className="form-control"
                  id="inputIngreso"
                  placeholder="Ingreso"
                  name="ingreso"
                  value={this.state.ingreso}
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
                  placeholder="Contraseña (Dejar en blanco para no cambiar)"
                  name="contrasenha"
                  value={this.state.contrasenha}
                  onChange={this.onChangeHandler}/>
              </div>
            </div>
            <hr />
            <div className="float-right ml-auto">
              <button className="btn btn-primary">Guardar</button>
              <Link className="btn btn-secondary"
                to="/">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ carreras, alumno }) {
  return { carreras, alumno };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCarreras: getCarreras,
    getAlumno: getAlumno
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CargarAlumno);
