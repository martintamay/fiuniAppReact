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
          <Link className="nav-link" to={`/materias/${usuario.student.id}`}>Materias </Link>
        </li>)
      ];
      lista = studentList;
    }
    if (usuario.professor!==null) {
      let professorList = [
        (<li className="nav-item" key="p-materias-a-cargo">
          <Link className="nav-link" to="/materias-a-cargo">
            Materias a Cargo
          </Link>
        </li>),
        (<li className="nav-item" key="p-perfil">
          <Link className="nav-link" to={`/profesor/${usuario.professor.id}`}>
            Datos Profesor
          </Link>
        </li>)
      ];
      lista = [...lista, ...professorList];
    }
    if (usuario.administrator!==null) {
      let administratorList = [
        (
          <li className="nav-item dropdown" key="a-agregar-menu">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Agregar
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/cargar-materia">
                Materia
              </Link>
              <Link className="dropdown-item" to="/cargar-profesor">
                Profesor
              </Link>
              <Link className="dropdown-item" to="/cargar-alumno">
                Profesor
              </Link>
            </div>
          </li>
        ),
        (<li className="nav-item" key="a-revisar-notas">
          <Link className="nav-link" to="/por-aprobar">
            Revisar Notas
          </Link>
        </li>),
        (<li className="nav-item" key="a-cargar-notas">
          <Link className="nav-link" to="/materias-a-cargo">
            Cargar Notas
          </Link>
        </li>)
      ];
      lista = [...lista, ...administratorList];
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

        <nav className="navbar navbar-expand-lg navbar-dark bg-red-fiuni">
          <Link className="navbar-brand" to="/">
            <img src="/assets/images/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="" /> FIUNI APP
          </Link>
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
            <ul className="navbar-nav ml-auto">
              {this.renderMenuItems()}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/login"
                  onClick={this.props.cerrarSesion}>
                  Cerrar Sesión
                </Link>
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
