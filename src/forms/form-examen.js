import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Form, Text, Select, Option } from 'informed';

import { getMaterias } from '../actions';

class FormExamen extends Component {
  constructor(props){
    super(props);

    this.getInitialValues = this.getInitialValues.bind(this);
  }

  componentDidMount(){
    if(this.props.materias === null){
      this.props.getMaterias();
    }
  }

  renderMaterias(){
    let materias = this.props.materias;
    if (materias === null) {
      return <Option value="0" key="carr0" disabled>Cargando materias...</Option>;
    }

    const sinEsp = <Option value="0" key="carr0" disabled>Elija una materias</Option>;
    let opMaterias = Object.keys(materias).map(function(id, index) {
      return (
        <Option
          key={id}
          value={id}>
          {materias[id].name}
        </Option>
      );
    });
    return [sinEsp, ...opMaterias];
  }

  getInitialValues(){
    if(this.props.examen !== undefined){
      return this.props.examen;
    } else {
      return { examination_type: "Final", subject_id: 1 };
    }
  }


  render(){
    return (
      <Form autoComplete="nope" onSubmit={this.props.onSubmit} initialValues={this.getInitialValues()}>
        <div className="row">
          <div className="col">
            <label htmlFor="inputFecha" className="col-sm-2 ">Fecha del Examen</label>
            <Text type="date"
              field="examination_date"
              className="form-control"
              id="inputFecha"
              placeholder="nombre"
              required />

            <label htmlFor="tipo" className="col-sm-2">Tipo</label>
            <Select className="form-control"
              field="examination_type"
              id="tipo">
              <Option value="PP">PP</Option>
              <Option value="Final">Final</Option>
            </Select>

          <label htmlFor="materia" className="col-sm-2">Materia</label>
          <Select className="form-control"
            field="subject_id"
            id="materia">
            {this.renderMaterias()}
          </Select>
          </div>
        </div>
        <hr />
        <div className="float-right ml-auto">
          <button className="btn btn-primary" type="submit">Guardar</button>
          <Link className="btn btn-secondary" to="/examenes">Cancelar</Link>
        </div>
      </Form>
    );
  }
}

function mapStateToProps({ materias }) {
  return { materias };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMaterias: getMaterias
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormExamen);
