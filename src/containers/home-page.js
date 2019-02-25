import React, { Component } from 'react';
import { connect } from 'react-redux';

import GridCarreras from '../grids/grid-carreras'


class HomePage extends Component {
  render(){
    if (this.props.usuario!=null) {
      if(this.props.usuario.administrator !== null){
        return (
          <section id="home-page">
            <div className="container">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Página Principal Administrador</h3>
                  <hr/>
                  <GridCarreras redirectSubjects="true" />
                </div>
              </div>
            </div>
          </section>
        );
      }
    }
    return (
      <section id="home-page">
        <div className="container">
          <div className="alert alert-secondary">
            Cargando Usuario...
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ usuario }) {
  return { usuario };
}

export default connect(mapStateToProps)(HomePage);
