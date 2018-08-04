import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getProfesores } from '../actions';

class ListarProfesores extends Component {
  constructor(props){
    super(props);

    this.renderProfesores = this.renderProfesores.bind(this);
  }

  componentDidMount(){
    if(this.props.profesores===null){
      this.props.getProfesores();
    }
  }

  renderProfesores(){
    let profesores = this.props.profesores;
    if (profesores!==null) {
      return Object.keys(profesores).map(function(id, index) {
        let profesor = profesores[id].person;
        return (
          <tr key={id}>
            <th scope="row">{id}</th>
            <td>{profesor.names}</td>
            <td>{profesores.ci}</td>
            <td>{profesores.email}</td>
            <td>
              <Link className="btn btn-light" to={`/editar-profesor/${id}`} >Editar</Link>
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
          <h2>Lista de Profesores</h2>
          <hr />
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">CI</th>
                <th scope="col">Correo</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.renderProfesores()}
            </tbody>
          </table>
          <div className="btn-group ml-auto">
            <Link className="btn btn-primary"
              to="cargar-profesor">
              Agregar
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ profesores }) {
  return { profesores };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getProfesores: getProfesores
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarProfesores);
