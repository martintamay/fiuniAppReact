import React, { Component } from 'react';
import { getCarreras, agregarMateria } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import FormMateria from '../forms/form-materia';

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

  render(){
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
