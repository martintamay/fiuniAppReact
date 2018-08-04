import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Text, Scope } from 'informed';

export default class FormProfesor extends Component {
  render(){
    return (
      <Form autoComplete="nope" onSubmit={this.props.onSubmit}>
        <Scope scope="person">
          <div className="row">
            <div className="col">
              <label htmlFor="inputProfesor" className="col-sm-2 ">Nombre Completo</label>
              <Text className="form-control"
                id="inputProfesor"
                placeholder="Nombre"
                field="names" />

              <label htmlFor="inputCI" className="col-sm-2 ">CI</label>
              <Text className="form-control"
                id="inputCI"
                placeholder="CI"
                field="ci" />

              <label htmlFor="inputCorreo" className="col-sm-2 ">Correo</label>
              <div className="input-group">
                <Text className="form-control"
                  id="inputCorreo"
                  placeholder="Correo"
                  field="email" />

                <div className="input-group-append">
                  <span className="input-group-text" id="basic-addon2">@fiuni.edu.py</span>
                </div>
              </div>

              <label htmlFor="inputContrasenha" className="col-sm-2 ">Contraseña</label>
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
          <Link className="btn btn-secondary" to="/">Cancelar</Link>
        </div>
      </Form>
    );
  }
}
