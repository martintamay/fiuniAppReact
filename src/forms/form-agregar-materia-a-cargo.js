import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Select, Option } from 'informed';
import { getMaterias } from '../actions';

import { error } from '../utils';

class FormAgregarMateriaACargo extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.getInitialValues = this.getInitialValues.bind(this);
    this.renderMaterias = this.renderMaterias.bind(this);
  }

  componentDidMount(){
    this.props.getMaterias();
  }

  renderMaterias(){
    let materias = this.props.materias;
    let activas = this.props.materias_a_cargo;
    if (materias === null || activas===null) {
      return <Option value="0" key="carr0" disabled>Cargando materias...</Option>;
    }


    materias = Object.values(materias).filter((materia)=>{
      return activas.find((act)=>act.id===materia.id)===undefined;
    });

    materias = materias.sort((mat1, mat2)=>{return mat1.name > mat2.name})

    const sinEsp = <Option value="0" key="carr0">Elija una materia</Option>;
    let opmaterias = materias.map((materia) => {
      return (
        <Option
          key={materia.id}
          value={materia.id}>
          {materia.name}
        </Option>
      );
    });
    return [sinEsp, ...opmaterias];
  }

  onSubmit(values){
    let ejec = true;
    if(values.subject_id === 0){
      error("Elija una materia!");
      ejec = false;
    }
    if(ejec) this.props.onSubmit(values);
  }

  getInitialValues(){
    return { subject_id: 0 };
  }

  render(){
    return (
      <Form autoComplete="nope" onSubmit={this.onSubmit} initialValues={this.getInitialValues()}>
        <div className="form-row">
          <label htmlFor="inputCarrera">Materia</label>
          <Select className="form-control"
            id="inputMateria"
            field="subject_id"
            required >
            {this.renderMaterias()}
          </Select>
        </div>
        <hr />
        <div className="float-right ml-auto">
          <button type="submit" className="btn btn-primary">Guardar</button>
          <a className="btn btn-secondary" onClick={()=>this.props.cancelar()}>Cancelar</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormAgregarMateriaACargo);
