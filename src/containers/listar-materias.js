import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getCarreras, getMaterias } from '../actions';

class ListarMaterias extends Component {
  constructor(props){
    super(props);

    this.renderMaterias = this.renderMaterias.bind(this);
  }

  componentDidMount(){
    if(this.props.carreras===null){
      this.props.getCarreras();
    }
    if(this.props.materias===null){
      this.props.getMaterias();
    }
  }

  renderMaterias(){
    let materias = this.props.materias, carreras = this.props.carreras;
    if (materias!==null) {
      return Object.keys(materias).map(function(id, index) {
        let materia = materias[id];
        return (
          <tr key={id}>
            <th scope="row">{id}</th>
            <td>{materia.name}</td>
            <td>{carreras[materia.career.id].description}</td>
            <td>{materia.semester}</td>
            <td>
              <Link className="btn btn-light" to={`/materias/${id}/editar`} >Editar</Link>
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <th colSpan="4">Cargando</th>
        </tr>
      );
    }
  }

  render(){
    return (
      <section id="carga-materia">
        <div className="container card">
          <h2>Lista de Materias</h2>
          <hr />
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Carrera</th>
                <th scope="col">Semestre</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.renderMaterias()}
            </tbody>
          </table>
          <div className="btn-group ml-auto">
            <Link className="btn btn-primary"
              to="cargar-materia">
              Agregar
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ carreras, materias }) {
  return { carreras, materias };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCarreras: getCarreras,
    getMaterias: getMaterias
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarMaterias);
