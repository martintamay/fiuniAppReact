import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { getCarreras } from '../actions';

import GridCarreras from '../grids/grid-carreras'

class ListarCarreras extends Component {
  render(){
    return (
      <section id="carga-materia">
        <div className="container card">
          <h2>Lista de Carreras</h2>
          <hr />
          <GridCarreras />
        </div>
      </section>
    );
  }
}

function mapStateToProps({ carreras }) {
  return { carreras };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCarreras: getCarreras
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarCarreras);
