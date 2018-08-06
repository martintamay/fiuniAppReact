import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Form, Text, Scope, Select, Option } from 'informed';

import { getCarreras } from '../actions';

class FormEstudiante extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.getInitialValues = this.getInitialValues.bind(this);
  }  

  componentDidMount(){
    if(this.props.carreras===null){
      this.props.getCarreras();
    }
  }

  onSubmit(values){
    if(!values.person.email.includes("@fiuni.edu.py")){
      values.person.email = `${values.person.email}@fiuni.edu.py`;
    }
    this.props.onSubmit(values);
  }

  renderCarreras(){
    if(this.props.carreras === null){
      return <Option value="" disabled>Cargando...</Option>;
    }
    let carreras = Object.values(this.props.carreras);
    return carreras.map((carrera)=>{
      return (
        <Option key={carrera.id}
          value={carrera.id}>
          {carrera.description}
        </Option>
      );

    });
  }

  getInitialValues(){
    let initialState = this.props.estudiante;
    if(this.props.estudiante!==undefined){
      initialState.person.email = initialState.person.email.replace("@fiuni.edu.py", "");
      return initialState;
    } else {
      return {career_id: 1};
    }
  }

  render(){
    return (
      <Form autoComplete="nope" onSubmit={this.onSubmit} initialValues={this.getInitialValues()}>
        <div className="form-row">
          <Scope scope="person">
            <div className="col-md-6">
              <label htmlFor="inputProfesor">Nombre Completo</label>
              <Text className="form-control"
                id="inputProfesor"
                placeholder="Nombre"
                field="names"
                required />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCI">CI</label>
              <Text className="form-control"
                id="inputCI"
                placeholder="CI"
                field="ci" />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCorreo">Correo</label>
              <div className="input-group">
                <Text className="form-control text-right"
                  id="inputCorreo"
                  placeholder="Correo"
                  field="email"
                  required />

                <div className="input-group-append">
                  <span className="input-group-text">@fiuni.edu.py</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputContrasenha">Contraseña</label>
              <Text type="password"
                className="form-control"
                id="inputContrasenha"
                placeholder="Contraseña"
                field="password" />
            </div>
          </Scope>
          <div className="col-md-6">
            <label htmlFor="inputCarrera">Carrera</label>
            <Select className="form-control"
              id="inputCarrera"
              field="career_id"
              required >
              {this.renderCarreras()}
            </Select>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputIngreso">Año de Ingreso</label>
            <Text className="form-control"
              id="inputIngreso"
              placeholder="Año de ingreso"
              field="entry_year" />
          </div>
        </div>
        <hr />
        <div className="float-right ml-auto">
          <button type="submit" className="btn btn-primary">Guardar</button>
          <Link className="btn btn-secondary" to="/estudiantes">Cancelar</Link>
        </div>
      </Form>
    );
  }
}

function mapStateToProps({ carreras }) {
  return { carreras };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCarreras: getCarreras
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormEstudiante);
