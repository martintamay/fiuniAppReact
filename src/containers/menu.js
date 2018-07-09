import React, { Component } from 'react';
import { loguear, reloguin } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Menu extends Component {
  componentDidMount(){
    this.props.reloguin();
  }

  isLogued(){
    return this.props.usuario!==undefined &&
    this.props.usuario!==null &&
    this.props.usuario.session_token!==undefined &&
    this.props.usuario.session_token!==null;
  }

  render(){
    if(window.location.href.includes("login")){
      return <div id="NoMenu"></div>;
    }
    if(this.props.usuario!==null && this.props.usuario.id===undefined){
      let current = window.location.pathname;
      sessionStorage.setItem("previous_page", current);
      console.log("prev", sessionStorage.getItem("previous_page"));
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
                <li className="nav-item active">
                  <Link className="nav-link" to="/por-aprobar">Por Aprobar </Link>
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
    reloguin: reloguin
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
