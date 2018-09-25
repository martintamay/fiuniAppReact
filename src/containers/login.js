import React, { Component } from 'react';
import { loguear } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import { Redirect } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import '../assets/login.css';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      correo: "",
      contrasenha: "",
      recordar: false
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    //if(nextProps.usuario!==undefined) console.log("usuario", nextProps.usuario);
  }

  onChangeHandler(event){
    let input = event.target;
    switch (input.name) {
      case "correo":
          this.setState({ correo: input.value });
        break;
      case "contrasenha":
          this.setState({ contrasenha: input.value });
        break;
      case "recordar":
          this.setState({ recordar: input.checked });
        break;
      default:
        console.log("Invalid input handler");
        break;
    }
  }

  onSubmit(event){
    event.preventDefault();
    this.props.loguear(this.state.correo, this.state.contrasenha, this.state.recordar);
  }

  render(){
    if(this.props.usuario!==null && this.props.usuario.id!==undefined){
      let to = sessionStorage.getItem("previous_page");
      if (to===null) {
        to = "/inicio";
      }
      return <Redirect to={to} />;
    }
    return (
      <section id="login">
        <NotificationContainer />

        <form className="form-signin" onSubmit={this.onSubmit}>
          <img className="mb-4" src="/assets/images/logo.png" alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">Fiuni App</h1>
          <div className="input-group">
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input name="correo"
              id="inputEmail"
              className="form-control"
              placeholder="Correo"
              type="user"
              required autoFocus
              onChange={this.onChangeHandler}
              value={this.state.correo} />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">@fiuni.edu.py</span>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input name="contrasenha"
              id="inputPassword"
              className="form-control"
              placeholder="Contraseña"
              type="password"
              required
              onChange={this.onChangeHandler}
              value={this.state.contrasenha}/>
          </div>
          <div className="checkbox mb-3">
            <label>
              <input name="recordar"
                type="checkbox"
                onChange={this.onChangeHandler}
                checked={this.state.recordar}/> Recordar
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Iniciar Sesión</button>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
