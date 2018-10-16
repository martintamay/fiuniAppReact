import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Text, Scope } from 'informed';

export default class FormAdministrador extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.getInitialValues = this.getInitialValues.bind(this);
  }

  onSubmit(values){
    if(!values.person.email.includes("@fiuni.edu.py")){
      values.person.email = `${values.person.email}@fiuni.edu.py`;
    }
    this.props.onSubmit(values);
  }

  getInitialValues(){
    let initialState = this.props.administrador;
    if(this.props.administrador !== undefined){
      initialState.person.email = initialState.person.email.replace("@fiuni.edu.py", "");
      return initialState;
    }else {
      return {};
    }
  }

  render(){
    return (
      <Form autoComplete="nope" onSubmit={this.onSubmit} initialValues={this.getInitialValues()}>
        <Scope scope="person">
          <div className="form-row">
            <div className="col-md-6">
              <label htmlFor="inputAdministrador">Nombre Completo</label>
              <Text className="form-control"
                id="inputAdministrador"
                placeholder="Nombre"
                field="names"
                required />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCI">CI</label>
              <Text className="form-control"
                id="inputCI"
                placeholder="CI"
                field="ci" />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCorreo">Correo</label>
              <div className="input-group">
                <Text className="form-control text-right"
                  id="inputCorreo"
                  placeholder="Correo"
                  field="email"
                  required />

                <div className="input-group-append">
                  <span className="input-group-text">@fiuni.edu.py</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputContrasenha">Contraseña</label>
              <Text type="password"
                className="form-control"
                id="inputContrasenha"
                placeholder="Contraseña"
                field="password" />
            </div>
          </div>
        </Scope>
        <hr />
        <div className="float-right ml-auto">
          <button type="submit" className="btn btn-primary">Guardar</button>
          <Link className="btn btn-secondary" to="/administradores">Cancelar</Link>
        </div>
      </Form>
    );
  }
}
