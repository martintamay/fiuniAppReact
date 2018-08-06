import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getMaterias } from '../actions';
import GridMaterias from '../grids/grid-materias';

class ListarMaterias extends Component {


  componentDidMount(){
    if(this.props.materias===null){
      this.props.getMaterias();
    }
  }

<<<<<<< HEAD
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
=======

>>>>>>> b3fb2b2926f5c2862eb8a77890396e52d220e97a

  render(){
    return (
      <section id="carga-materia">
        <div className="container card">
          <h2>Lista de Materias</h2>
          <hr />
          <GridMaterias />
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

function mapStateToProps({ materias }) {
  return { materias };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMaterias: getMaterias
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarMaterias);
