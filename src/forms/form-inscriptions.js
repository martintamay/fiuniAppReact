import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Form, Text, Scope, Select, Option } from 'informed';

import { getCarreras } from '../actions';

class FormInscriptions extends Component {
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
          <Scope scope="materias">
            <div className="col-md-6">

            <div className="col-md-6">
              <label htmlFor="inputMaterias">Lista de Materias</label>
              <Text className="form-control"
                id="inputCI"
                placeholder="CI"
                field="ci" />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCheck">Inscribirse</label>
              <div className="input-group">
                <Text className="form-control text-right"
                  id="inutCheck"
                  <input onChange={} type="checkbox" name="materia" />
                  placeholder="Inscribirse"
                  field="materia"
                  required />
          </Scope>

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
