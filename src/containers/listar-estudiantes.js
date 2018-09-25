import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getEstudiantes } from '../actions';
import GridEstudiantes from '../grids/grid-estudiantes';

class ListarEstudiantes extends Component {


  componentDidMount(){
    if(this.props.estudiantes===null){
      this.props.getEstudiantes();
    }
  }



  render(){
    return (
      <section id="carga-materia">
        <div className="container card">
          <h2>Lista de Estudiantes</h2>
          <hr />
          <GridEstudiantes />
          <div className="btn-group ml-auto">
            <Link className="btn btn-primary"
              to="estudiantes/nuevo">
              Agregar
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ estudiantes }) {
  return { estudiantes };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getEstudiantes: getEstudiantes
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarEstudiantes);
