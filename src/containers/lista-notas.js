import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { notasMateria, getMaterias } from '../actions';
import { alert } from '../utils';

class ListaNotas extends Component {
  constructor (props){
    super(props);

    this.state = {
      anho: this.props.match.params.anho,
      redirect: false
    }

    this.renderAlumno = this.renderAlumno.bind(this);
    this.onChangeAnho = this.onChangeAnho.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();
    if(this.state.anho.length === 4){
      this.props.notasMateria(this.props.match.params.materia_id, this.state.anho);
      this.setState({ redirect: true });
    }else{
      alert("El año introducido es inválido");
    }
  }
  onChangeAnho(event){
    this.setState({ anho: event.target.value });
  }
  componentDidMount(){
    this.props.getMaterias();
    this.props.notasMateria(this.props.match.params.materia_id, this.props.match.params.anho);
  }

  renderAlumno(){
    let estudiantes = this.props.listaNotasMateria;

    return estudiantes.map((estudiante)=>{
      let notas= {
        pp:{1:"",2:"",3:""},
        final:{1:"",2:"",3:""}
      };
      estudiante.notes.forEach((nota)=>{
        if(nota.examination.examination_type==="PP"){
          notas.pp[nota.opportunity]=nota.percentage;
        }
        if(nota.examination.examination_type==="Final"){
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
    if(this.props.listaNotasMateria===null || this.props.materias===null){
      return (
        <section id="notas-materia">
          <div className="container card">
            <h2 className="card-title">Cargando...</h2>

            <div className="float-right ml-auto">
              <button
                onClick={()=>this.props.history.goBack()}
                type="button"
                className="btn btn-secondary">
                Volver
              </button>
            </div>
          </div>
        </section>
      );
    }

    if(this.state.redirect){
      if (this.state.anho === this.props.match.params.anho) {
        this.setState({ redirect: false});
      } else {
        return <Redirect to={`/materias/${this.props.match.params.materia_id}/notas/${this.state.anho}`} />;
      }
    }

    return (
      <section id="notas-materia">
        <div className="container card">
          <div className="row">
            <div className="col-md-6">
              <h2 className="card-title">Lista de Notas - {this.props.materias[this.props.match.params.materia_id].name}</h2>
              <h4 className="card-subtitle mb-2 text-muted">{this.props.match.params.anho}</h4>
            </div>
            <div className="col-md-6">
              <form onSubmit={this.onSubmit}>
                <label htmlFor="inputAnho">Año de Inscripción</label>
                <div className="input-group">
                  <input type="text"
                    id="inputAnho"
                    className="form-control"
                    placeholder="Año"
                    value={this.state.anho}
                    onChange={this.onChangeAnho}/>
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" type="submit">Buscar</button>
                      <Link to={`/materias/${this.props.match.params.materia_id}/examenes/para-carga`} className="btn btn-outline-primary">Cargar Notas</Link>
                    </div>
                </div>
              </form>
            </div>
          </div>
          <hr/>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">CI</th>
                <th scope="col">Nombre</th>
                <th scope="col">PP 1</th>
                <th scope="col">PP 2</th>
                <th scope="col">PP 3</th>
                <th scope="col">Final 1</th>
                <th scope="col">Final 2</th>
                <th scope="col">Final 3</th>
              </tr>
            </thead>
            <tbody>
              {this.renderAlumno()}
            </tbody>
          </table>

          <div className="float-right ml-auto">
            <button
              onClick={()=>this.props.history.goBack()}
              type="button"
              className="btn btn-secondary">
              Volver
            </button>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ listaNotasMateria, materias }) {
  return { listaNotasMateria, materias };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    notasMateria: notasMateria,
    getMaterias: getMaterias
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListaNotas);
