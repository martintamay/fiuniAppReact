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
