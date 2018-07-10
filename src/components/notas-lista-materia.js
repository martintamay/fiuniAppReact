import React, { Component } from 'react';

export default class NotasListaMateria extends Component {
  constructor(props){
    super(props);

    this.rendernotas = this.rendernotas.bind(this);
    this.renderNotas = this.renderNotas.bind(this);
  }

  renderNotas(notas){
    return notas.map((nota)=>{
      return (
        <li className="list-group-item" key={nota.id}>
          <b>{nota.tipo} {nota.oportunidad}:</b> {
            nota.tipo==="Puntos Parciales" ?
            `${nota.porcentaje}%` :
            nota.puntaje
          }
          <small className="float-right ml-auto">({nota.fecha})</small>
        </li>
      );
    });
  }

  rendernotas(){
    let anho = this.props.anho;
    let notas = this.props.notas;
    let materias = this.props.materias;
    let renderNotas = this.renderNotas;

    return Object.keys(notas).map(function(materia_id, index) {
      return (
        <div className="card-nota" key={materia_id}>
          <div className="card-header">
            {materias[materia_id].name} <small className="float-right ml-auto">{anho}</small>
          </div>
          <ul className="list-group list-group-flush">
            {renderNotas(notas[materia_id])}
          </ul>
        </div>
      );
    });
  }

  render(){
    return (
      <div className="card-anho">
        {this.rendernotas()}
      </div>
    );
  }

}
