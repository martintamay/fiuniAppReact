import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Form, Text, Select, Option } from 'informed';

import { getCarreras } from '../actions';

class FormMateria extends Component {
  constructor(props){
    super(props);

    this.getInitialValues = this.getInitialValues.bind(this);
  }

  componentDidMount(){
    if(this.props.carreras === null){
      this.props.getCarreras();
    }
  }

  renderCarreras(){
    let carreras = this.props.carreras;
    if (carreras === null) {
      return <Option value="0" key="carr0" disabled>Cargando carreras...</Option>;
    }

    const sinEsp = <Option value="0" key="carr0" disabled>Elija una carrera</Option>;
    let opCarreras = Object.keys(carreras).map(function(id, index) {
      return (
        <Option
          key={id}
          value={id}>
          {carreras[id].description}
        </Option>
      );
    });
    return [sinEsp, ...opCarreras];
  }

  getInitialValues(){
    if(this.props.materia !== undefined){
      return this.props.materia;
    } else {
      return { career_id: 1 };
    }
  }


  render(){
    return (
      <Form autoComplete="nope" onSubmit={this.props.onSubmit} initialValues={this.getInitialValues()}>
        <div className="row">
          <div className="col">
            <label htmlFor="inputNombre" className="col-sm-2 ">Nombre</label>
            <Text field="name"
              className="form-control"
              id="inputNombre"
              placeholder="nombre"
              required />

            <label htmlFor="Carrera" className="col-sm-2">Carrera</label>
            <Select className="form-control"
              field="career_id"
              id="carrera">
              {this.renderCarreras()}
            </Select>

            <label htmlFor="inputSemestre" className="col-sm-2 ">Semestre</label>
            <Text className="form-control"
              field="semester"
              id="inputSemestre"
              placeholder="semestre"
              required />
          </div>
        </div>
        <hr />
        <div className="float-right ml-auto">
          <button className="btn btn-primary" type="submit">Guardar</button>
          <Link className="btn btn-secondary" to="/materias">Cancelar</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormMateria);
