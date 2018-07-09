import React, { Component } from 'react';

export default class AlumnoCarga extends Component {
  constructor(props){
    super(props);

    this.state = {
      nota: "",
      puntos: 0,
      enviar: false
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  calcularNota(puntos){
    let porcentaje = 0;
    let nota = "Error";
    if (this.props.totalPuntos!==0) {
      porcentaje = puntos * 100 / this.props.totalPuntos;
    } else {
      porcentaje = puntos;
    }

    if (porcentaje < 60) nota = "1";
    else if (porcentaje < 70) nota = "2";
    else if (porcentaje < 80) nota = "3";
    else if (porcentaje < 90) nota = "4";
    else nota = "5";

    return nota;
  }

  onChangeHandler(event){
    let nota = 1;
    let puntos = parseInt(event.target.value, 10);
    if (isNaN(puntos)) {
      puntos = 0;

    }
    nota = this.calcularNota(puntos);
    this.setState({ puntos, nota, enviar: true });
  }

  render(){
    let est = this.props.cursada.student;
    return (
      <tr>
        <td>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="enviarcheck"
              checked={this.state.enviar}
              onChange={(evt)=>this.setState({ enviar: evt.target.checked })}/>
            <label className="form-check-label" htmlFor="enviarcheck"> Si</label>
          </div>
        </td>
        <td className="font-weight-bold">{est.person.ci}</td>
        <td>{est.person.names}</td>
        <td>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="puntos-4315943"
              placeholder="Logrados"
              onChange={this.onChangeHandler}
              value={this.state.puntos} />
          </div>
        </td>
        <td className="text-center font-weight-bold">
          {this.state.nota}
        </td>
      </tr>
    );
  }

}
