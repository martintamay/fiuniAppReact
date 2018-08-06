import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getProfesores, resetProfesor } from '../actions';
import GridProfesores from '../grids/grid-profesores';

class ListarProfesores extends Component {
  componentDidMount(){
    this.props.resetProfesor();
    if(this.props.profesores===null){
      this.props.getProfesores();
    }
  }

  render(){
    return (
      <section id="carga-materia">
        <div className="container card">
          <h2>Lista de Profesores</h2>
          <hr />
          <div className="btn-group ml-auto">
            <Link className="btn btn-primary"
              to="/profesores/nuevo">
              Agregar
            </Link>
          </div>
          <GridProfesores />
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
    getProfesores: getProfesores,
    resetProfesor: resetProfesor
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarProfesores);
