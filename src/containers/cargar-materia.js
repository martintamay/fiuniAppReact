import React, { Component } from 'react';
import { getCarreras, agregarMateria } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

class CargarMateria extends Component {
  constructor(props){
    super(props);

    this.state = {
      nombre: "",
      semestre: "",
      carrera: 0
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.carreras===null){
      this.props.getCarreras();
    }
  }

  onChangeHandler(event){
    let input = event.target;
    switch (input.name) {
      case "nombre":
          this.setState({ nombre: input.value });
        break;
      case "carrera":
          this.setState({ carrera: input.value });
        break;
      case "semestre":
          this.setState({ semestre: input.value });
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
    } else if (this.state.carrera==="" || this.state.carrera===0) {
      this.error("Introduzca una carrera válida");
      check = false;
    } else if (this.state.semestre==="" || this.state.semestre<=0 || this.state.semestre>10 ) {
      this.error("Introduzca un semestre válido");
      check = false;
    }
    return check;
  }

  onSubmit(event){
    event.preventDefault();
    if(this.comprobarCampos()){
      let datos = {
        subject: {
          name: this.state.nombre,
          semester: this.state.semestre,
          career_id: this.state.carrera
        }
      };
      this.props.agregarMateria(datos)
    }
  }

  renderCarreras(){
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
      <section id="carga-materia">
        <form onSubmit={this.onSubmit}>
          <div className="container card">
            <h1>Nueva Materia</h1>
            <hr />
            <div className="row">
              <div className="col">
                <label htmlFor="inputNombre" className="col-sm-2 ">Nombre</label>
                <input type="text"
                  name="nombre"
                  className="form-control"
                  id="inputNombre"
                  placeholder="nombre"
                  value={this.state.nombre}
                  onChange={this.onChangeHandler} />

                <label htmlFor="Carrera" className="col-sm-2">Carrera</label>
                <select className="form-control"
                  name="carrera"
                  id="carrera"
                  value={this.state.carrera}
                  onChange={this.onChangeHandler}>
                  {this.renderCarreras()}
                </select>

                <label htmlFor="inputSemestre" className="col-sm-2 ">Semestre</label>
                <input type="number"
                  className="form-control"
                  name="semestre"
                  id="inputSemestre"
                  placeholder="semestre"
                  value={this.state.semestre}
                  onChange={this.onChangeHandler} />
              </div>
            </div>
            <hr />
            <div className="float-right ml-auto">
              <button className="btn btn-primary">Guardar</button>
              <Link className="btn btn-secondary" to="/materias">Cancelar</Link>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

function mapStateToProps({ carreras }) {
  return { carreras };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCarreras: getCarreras,
    agregarMateria: agregarMateria
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CargarMateria);
