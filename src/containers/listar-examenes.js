import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { getMateria, resetExamen } from '../actions';
import { Link } from 'react-router-dom';

import GridExamenes from '../grids/grid-examenes'

class ListarExamenes extends Component {
  componentDidMount(){
    this.props.resetExamen();
    if(this.props.match.params.materia_id!==undefined){
      this.props.getMateria(this.props.match.params.materia_id);
    }
  }

  render(){
    return (
      <section id="carga-materia">
        <div className="container card">
          <h2>Lista de Examenes {this.props.materia===null ? "" : ` - ${this.props.materia.name}`}</h2>
          <hr />
          <GridExamenes idmateria={this.props.match.params.materia_id}/>
          <div className="btn-group ml-auto">
            <Link className="btn btn-primary"
              to="examenes/nuevo">
              Agregar
            </Link>
            <button
              className="btn btn-light"
              onClick={() => this.props.history.goBack()}>
              Volver
            </button>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ materia }) {
  return { materia };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMateria: getMateria,
    resetExamen: resetExamen
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarExamenes);
