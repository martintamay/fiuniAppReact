import React, { Component } from 'react';
import { loguear, reloguin, cerrarSesion } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Menu extends Component {
  constructor(props){
    super(props);

    this.renderMenuItems = this.renderMenuItems.bind(this);
  }
  componentDidMount(){
    this.props.reloguin();
  }

  renderMenuItems(){
    let lista = [];
    let usuario = this.props.usuario;
    if(this.props.usuario===null) return "";
    if (usuario.student!==null) {
      let studentList = [
        (<li className="nav-item" key="s-notas">
          <Link className="nav-link" to="/notas">Notas </Link>
        </li>),
        (<li className="nav-item" key="s-perfil">
          <Link className="nav-link" to={`/alumno/${usuario.student.id}`}>Perfil </Link>
        </li>),
        (<li className="nav-item" key="s-materias">
          <Link className="nav-link" to="/materias">Materias </Link>
        </li>)
      ];
      lista = studentList;
    }
    return lista;
  }

  render(){
    if(window.location.pathname.includes("login")){
      return <div id="NoMenu"></div>;
    }
    if(this.props.usuario!==null && this.props.usuario.id===undefined){
      let current = window.location.pathname;
      sessionStorage.setItem("previous_page", current);
      NotificationManager.warning("Inicie Sesión para continuar");
      return <Redirect to="/login" />;
    }
    return (
      <section id="menu">
        <NotificationContainer />

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">FIUNI APP</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mr-auto">
                {this.renderMenuItems()}
                <li className="nav-item">
                  <a className="nav-link" onClick={this.props.cerrarSesion}>Cerrar Sesión</a>
                </li>
              </ul>
            </div>
        </nav>
      </section>
    );
  }
}

function mapStateToProps({ usuario }) {
  return { usuario };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loguear: loguear,
    reloguin: reloguin,
    cerrarSesion: cerrarSesion
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
