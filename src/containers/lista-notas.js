import React, { Component } from 'react';
import { notasMateria } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ListaNotas extends Component {
  constructor (props){
    super(props);
    this.renderAlumno=this.renderAlumno.bind(this);

  }
  componentDidMount(){
    this.props.notasMateria(this.props.match.params.materia_id);
  }

  renderAlumno(){
    let { notes } = this.props.listaNotasMateria;

    return notes.students.map((estudiante)=>{
      let notas= {
        pp:{1:"",2:"",3:""},
        final:{1:"",2:"",3:""}
      };
      estudiante.note.forEach((nota)=>{
        if(nota.noteType==="PP"){
          notas.pp[nota.opportunity]=nota.percentage;
        }
        if(nota.noteType==="Final"){
          notas.final[nota.opportunity]=nota.score;
        }
      });
      return (
        <tr key={estudiante.id}>
          <th scope="row">{estudiante.person.ci}</th>
          <td>{estudiante.person.names}</td>
          <td>{notas.pp[1]}</td>
          <td>{notas.pp[2]}</td>
          <td>{notas.pp[3]}</td>
          <td>{notas.final[1]}</td>
          <td>{notas.final[2]}</td>
          <td>{notas.final[3]}</td>

        </tr>
      );
    });
  }
  render(){
    if(this.props.listaNotasMateria===null){
      return (
        <section id="notas-materia">
          <div className="container card">
            <h2 className="card-title">Cargando...</h2>
          </div>
        </section>
      );
    }

    return (
      <section id="notas-materia">
        <div className="container card">
          <h2 className="card-title">Lista de Notas-Algoritmos y Estructura de Datos</h2>
          <h4 className="card-subtitle mb-2 text-muted">2018</h4>

          <hr/>
          <table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">CI</th>
      <th scope="col">Nombre</th>
      <th scope="col">PP1</th>
      <th scope="col">PP2</th>
      <th scope="col">PP3</th>
      <th scope="col">Final1</th>
      <th scope="col">Final2</th>
      <th scope="col">Final3</th>
    </tr>
  </thead>
  <tbody>
    {this.renderAlumno()}
  </tbody>
</table>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ listaNotasMateria }) {
  return { listaNotasMateria };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    notasMateria: notasMateria
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListaNotas);
