import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { getMateria } from '../actions';

import GridExamenes from '../grids/grid-examenes'

class ListarExamenes extends Component {
  componentDidMount(){
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
    getMateria: getMateria
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarExamenes);
