import React, { Component } from 'react';
import { getExamenesPorAprobar, getExamenes, getMaterias, enviarNotasRevisadas } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RevisionMateria from '../components/revision-materia';
import '../assets/toggle-switch.css';

class examenesPorAprobar extends Component {
  constructor(props){
    super(props);

    this.state = {
      notasCorrigiendose: null,
      onlyUncheckeds: true
    }

    this.guardar = this.guardar.bind(this);
    this.renderNotas = this.renderNotas.bind(this);
    this.onlyUncheckedsChange = this.onlyUncheckedsChange.bind(this);
  }

  componentDidMount(){
    if(this.props.materias===null){
      this.props.getMaterias();
    }
    this.props.getExamenesPorAprobar();
  }

  guardar(notes){
    let notasOrdenadas = [];
    for (var id in notes) {
      if (notes.hasOwnProperty(id)) {
        notasOrdenadas.push({ id, checked: notes[id] });
      }
    }

    this.props.enviarNotasRevisadas(notasOrdenadas);
    this.props.getExamenesPorAprobar();
    this.setState({ notasCorrigiendose: null });
    console.log(notasOrdenadas);
  }

  renderNotas(notes){
    if(notes === null || this.props.materias === null){
      return (<tr><td colSpan="3">Cargando...</td></tr>);
    }
    notes = notes.sort(function(a,b) {return (a.examination_date > b.examination_date) ? 1 : ((b.examination_date > a.examination_date) ? -1 : 0);});
    console.log("notes", notes);
    return notes.map((note)=>{
      return (
        <tr key={`npa-${note.subject.id}-${note.examination_date}`}>
          <td>{note.examination_date}</td>
          <td>{note.examination_type}</td>
          <td>{this.props.materias[note.subject.id].name}</td>
          <td>
            <button
              className="btn btn-secondary"
              onClick={()=>this.setState({ notasCorrigiendose: note })}>
              Revisar <i className="fas fa-caret-right fa-lg"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  onlyUncheckedsChange(evt){
    if (evt.target.checked===true) {
      this.props.getExamenesPorAprobar();
    }else{
      this.props.getExamenes();
    }
    this.setState({ onlyUncheckeds: evt.target.checked });
  }

  render(){
    if(this.state.notasCorrigiendose!==null){
      return (
        <RevisionMateria
          lista={this.state.notasCorrigiendose}
          guardar={this.guardar}
          cancelar={()=>this.setState({ notasCorrigiendose: null })} />
      );
    }
    return (
      <section id="notas-por-aprobar">
        <div className="container card">
          <div className="row">
            <div className="col">
              <h1>Notas por aprobar</h1>
            </div>
            <div className="col">
              <div className="form-group float-right">
                <span>Solo con Pendientes</span>
                <div className="switch">
                  <input
                    id="cmn-toggle-4"
                    className="cmn-toggle cmn-toggle-round-flat"
                    type="checkbox"
                    checked={this.state.onlyUncheckeds}
                    onChange={this.onlyUncheckedsChange}/>
                  <label htmlFor="cmn-toggle-4"></label>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <table className="table table-striped table-bordered tabla-notas">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Tipo</th>
                <th scope="col">Nombre</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.renderNotas(this.props.examenesPorAprobar)}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ usuario, examenesPorAprobar, materias }) {
  return { usuario, examenesPorAprobar, materias };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getExamenesPorAprobar: getExamenesPorAprobar,
    getExamenes: getExamenes,
    getMaterias: getMaterias,
    enviarNotasRevisadas: enviarNotasRevisadas
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(examenesPorAprobar);
