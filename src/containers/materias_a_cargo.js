import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getMateriasACargo, setProfesorMateria } from '../actions';
import { isAdmin } from '../utils';
import GridMateriasACargo from '../grids/grid-materias-a-cargo';
import FormAgregarMateriaACargo from '../forms/form-agregar-materia-a-cargo';

class MateriasACargo extends Component {
  constructor(props){
    super(props);

    this.state = { agregando: false };
    this.agregarMateria = this.agregarMateria.bind(this);
  }

  componentDidMount(){
    this.props.getMateriasACargo(this.props.match.params.profesor_id);
  }

  agregarMateria(values){
    this.props.setProfesorMateria(values.subject_id, this.props.match.params.profesor_id);
    this.setState({ agregando: false });
  }

  renderPantallaAgregar(){
//TODO: retornar el formulario
    return (
      <section id="agregar-materias-a-cargo">
        <div className="container card">
          <h1>Agregar Materias A Cargo</h1>
          <FormAgregarMateriaACargo
            onSubmit={this.agregarMateria}
            cancelar={()=>this.setState({ agregando: false })}
            materias_a_cargo={this.props.materiasACargo}/>
        </div>
      </section>
    );
  }

  renderButtonAgregar(){
    if(isAdmin(this.props.usuario)){
      return (
        <div className="float-right ml-auto">
          <button type="submit" className="btn btn-primary" onClick={()=>this.setState({ agregando: true })}>Agregar</button>
        </div>
      );
    }
    return "";
  }

  render(){
    if(this.props.materiasACargo===null){
      return (
        <section id="materias-a-cargo">
          <div className="container card">
            <h1>Materias A Cargo</h1>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Cargando
              </li>
            </ul>
          </div>
        </section>
      );
    }
    if(this.state.agregando) return this.renderPantallaAgregar();
    return (
      <section id="materias-a-cargo">
        <div className="container card">
          <h1>Materias A Cargo</h1>
          <GridMateriasACargo materias={this.props.materiasACargo} />
          {this.renderButtonAgregar()}
        </div>
      </section>
    );
  }
}

function mapStateToProps({ materiasACargo, usuario }) {
  return { materiasACargo, usuario };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMateriasACargo: getMateriasACargo,
    setProfesorMateria: setProfesorMateria
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MateriasACargo);
