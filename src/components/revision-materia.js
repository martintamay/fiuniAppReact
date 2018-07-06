import React, { Component } from 'react';

export default class RevisionMateria extends Component {
  constructor(props){
    super(props);

    this.state = {
      notas: {}
    }
  }
  inputChange(value, student){
    let notas = JSON.parse(JSON.stringify(this.state.notas));
    if (notas[student]===undefined) {
      notas[student] = 0;
    }
    if (value>=10) {
      notas[student] = notas[student]%10;
    }else{
      notas[student] = Math.floor(notas[student]/10)*10;
    }
    notas[student] = notas[student]+value;
    this.setState({ notas });
  }

  /**
  * type 1 = secretaría y type 0 = académico
  */
  getInputValue(student, type){
    let check = this.state.notas[student];
    if (check===undefined) {
      return 0;
    }else{
      if (type===0) {
        return Math.floor(check/10);
      }else{
        return check%10;
      }
    }
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
                name={`aca-${note.student.person.ci}`}
                checked={this.getInputValue(note.student.id, 0)===1}
                onChange={(evt)=>this.inputChange(10, note.student.id)}/>
                <label className="form-check-label" htmlFor={`aca-${note.student.person.ci}`}>Si</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name={`aca-${note.student.person.ci}`}
                checked={this.getInputValue(note.student.id, 0)===2}
                onChange={(evt)=>this.inputChange(20, note.student.id)} />
                <label className="form-check-label" htmlFor={`aca-${note.student.person.ci}`}>No</label>
            </div>
            <div className="form-check form-check-inline" hidden>
              <input
                className="form-check-input"
                type="radio"
                checked={this.getInputValue(note.student.id, 0)===0}
                name={`aca-${note.student.person.ci}`}
                onChange={(evt)=>this.inputChange(0, note.student.id)} />
                <label className="form-check-label" htmlFor={`aca-${note.student.person.ci}`}>Sin revisar</label>
            </div>
          </td>
          <td>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
                type="radio"
                name={`sec-${note.student.person.ci}`}
                checked={this.getInputValue(note.student.id, 1)===1}
                onChange={(evt)=>this.inputChange(1, note.student.id)} />
                <label className="form-check-label" htmlFor={`aca-${note.student.person.ci}`}>Si</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name={`sec-${note.student.person.ci}`}
                checked={this.getInputValue(note.student.id, 1)===2}
                onChange={(evt)=>this.inputChange(2, note.student.id)} />
                <label className="form-check-label" htmlFor={`aca-${note.student.person.ci}`}>No</label>
            </div>
            <div className="form-check form-check-inline" hidden>
              <input
                className="form-check-input"
                value="0"
                type="radio"
                checked={this.getInputValue(note.student.id, 1)===0}
                name={`sec-${note.student.person.ci}`}
                onChange={(evt)=>this.inputChange(0, note.student.id)} />
                <label className="form-check-label" htmlFor={`aca-${note.student.person.ci}`}>Sin revisar</label>
            </div>
          </td>
        </tr>
      );
    })
  }

  guardar(){

  }

  render(){
    return (
      <section id="revision-materia">
        <div className="container">
          <h1>Control de aprobación de {this.props.lista.subject.name}</h1>
          <hr />
          <table className="table table-striped table-bordered tabla-notas">
            <thead>
              <tr>
                <th scope="col">CI</th>
                <th scope="col">Nombre</th>
                <th>Académico</th>
                <th>Secretaría</th>
              </tr>
            </thead>
            <tbody>
              {this.renderNotas(this.props.lista.notes)}
            </tbody>
          </table>
          <div className="float-right">
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
