import React, { Component } from 'react';
import { getMateriasACargo } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GridMateriasACargo from '../grids/grid-materias-a-cargo';

class MateriasACargo extends Component {
  componentDidMount(){
    this.props.getMateriasACargo(this.props.match.params.profesor_id);
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
    return (
      <section id="materias-a-cargo">
        <div className="container card">
          <h1>Materias A Cargo</h1>
          <GridMateriasACargo materias={this.props.materiasACargo} />
        </div>
      </section>
    );
  }
}

function mapStateToProps({ materiasACargo }) {
  return { materiasACargo };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMateriasACargo: getMateriasACargo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MateriasACargo);
