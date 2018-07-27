import React, { Component } from 'react';

export default class RevisionMateria extends Component {
  constructor(props){
    super(props);

    let notas = {};
    props.lista.notes.forEach((note)=>{
      notas[note.id]=note.checked;
    });

    this.state = {
      notas
    }

    this.guardar = this.guardar.bind(this);
  }
  inputChange(value, note_id){
    let notas = JSON.parse(JSON.stringify(this.state.notas));
    notas[note_id]=value;

    this.setState({ notas });
  }

  renderNotas(notes){
    if (notes===null) {
      return (<tr><td  colSpan="3">Cargando</td></tr>);
    }
    return notes.map((note)=>{
      return (
        <tr key={note.student.person.ci}>
          <td>{note.student.person.ci}</td>
          <td>{note.student.person.names}</td>
          <td>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name={`aca-${note.id}`}
                checked={this.state.notas[note.id]===1}
                onChange={(evt)=>this.inputChange(1, note.id)}/>
                <label className="form-check-label" htmlFor={`aca-${note.id}`}>Si</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name={`aca-${note.id}`}
                checked={this.state.notas[note.id]===2}
                onChange={(evt)=>this.inputChange(2, note.id)} />
                <label className="form-check-label" htmlFor={`aca-${note.id}`}>No</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                checked={this.state.notas[note.id]===0}
                name={`aca-${note.id}`}
                onChange={(evt)=>this.inputChange(0, note.id)} />
                <label className="form-check-label" htmlFor={`aca-${note.id}`}>Sin revisar</label>
            </div>
          </td>
        </tr>
      );
    })
  }

  guardar(){
    this.props.guardar(this.state.notas);
  }

  render(){
    return (
      <section id="revision-materia">
        <div className="container card">
          <h1>Control de aprobación de {this.props.lista.subject.name}</h1>
          <hr />
          <table className="table table-striped table-bordered tabla-notas">
            <thead>
              <tr>
                <th scope="col">CI</th>
                <th scope="col">Nombre</th>
                <th>Aprobado</th>
              </tr>
            </thead>
            <tbody>
              {this.renderNotas(this.props.lista.notes)}
            </tbody>
          </table>
          <div className="float-right ml-auto">
            <button
              onClick={this.props.cancelar}
              type="button"
              className="btn btn-secondary">
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.guardar}>
              Guardar
            </button>
          </div>
        </div>
      </section>
    );
  }
}
