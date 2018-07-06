import React, { Component } from 'react';
import { loguear } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Menu extends Component {
  componentDidMount(){
    /*if(this.props.usuario===null || this.props.usuario===undefined){
      if(localStorage.getItem("session_token")!=null){
        this.props.recuperarLogueo(localStorage.getItem("session_token"));
      }
    }*/
  }

  isLogued(){
    return this.props.usuario!==undefined &&
    this.props.usuario!==null &&
    this.props.usuario.session_token!==undefined &&
    this.props.usuario.session_token!==null;
  }

  render(){
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
    loguear: loguear
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
