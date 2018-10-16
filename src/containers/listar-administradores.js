import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getAdministradores, resetAdministrador } from '../actions';
import GridAdministradores from '../grids/grid-administradores';

class ListarAdministradores extends Component {
  componentDidMount(){
    this.props.resetAdministrador();
    if(this.props.administradores===null){
      this.props.getAdministradores();
    }
  }

  render(){
    return (
      <section id="carga-materia">
        <div className="container card">
          <h2>Lista de Administradores</h2>
          <hr />
          <GridAdministradores />
          <div className="btn-group ml-auto">
            <Link className="btn btn-primary"
              to="/administradores/nuevo">
              Agregar
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ administradores }) {
  return { administradores };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAdministradores: getAdministradores,
    resetAdministrador: resetAdministrador
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarAdministradores);
