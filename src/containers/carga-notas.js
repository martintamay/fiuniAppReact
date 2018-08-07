import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAlumnosParaCargar, getMateria } from '../actions';
import AlumnoCarga from '../components/estudiante-carga';

class CargaNotas extends Component {
  constructor(props){
    super(props);

    this.state = {
      tipo: "porcentaje",
      total: 0,
      puntos: {}
    }

    this.selectChangesHandler = this.selectChangesHandler.bind(this);
    this.onChangeTotal = this.onChangeTotal.bind(this);
  }

  componentDidMount(){
    this.props.getAlumnosParaCargar(this.props.match.params.examen_id);
  }

  selectChangesHandler(event){
    this.setState({
      tipo: event.target.options[event.target.selectedIndex].value,
      total: 0
    });
  }

  onChangeTotal(event){
    let total = parseInt(event.target.value, 10);
    if (isNaN(total)) {
      total = 0;
    }
    this.setState({ total });
  }
  renderAlumnos(){
    let cursadas = this.props.estudiantesParaCargar;
    return cursadas.map((cursada)=>{
      return <AlumnoCarga
        cursada={cursada}
        key={cursada.id}
        totalPuntos={this.state.total}/>
    });
  }

  render(){
    if(this.props.estudiantesParaCargar===null){
      return (
        <section id="materias-cursandose">
          <div className="container card">
            <h1>Carga Notas</h1>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Cargando...
              </li>
            </ul>
          </div>
        </section>
      );
    }
    return (
      <section id="materias-cursandose">
        <div className="container card">
          <h1>Carga Notas</h1>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="tipo-introduccion">A Introducirse</label>
              <select
                className="form-control"
                id="tipo-introduccion"
                onChange={this.selectChangesHandler}>
                <option value="porcentaje">Porcentaje</option>
                <option value="puntos">Puntos</option>
              </select>
            </div>
            {
              this.state.tipo==="porcentaje"?"":
              <div className="form-group col">
                <label htmlFor="total">Total de Puntos</label>
                <input
                  type="number"
                  className="form-control"
                  id="total"
                  placeholder="Total"
                  onChange={this.onChangeTotal}
                  value={this.state.total} />
              </div>
            }
          </div>
          <hr />

          <table className="table table-striped table-bordered tabla-notas">
            <thead>
              <tr>
                <th scope="col">Enviar</th>
                <th scope="col">CI</th>
                <th scope="col">Nombres</th>
                <th scope="col">Logrado</th>
                <th scope="col">Nota</th>
              </tr>
            </thead>
            <tbody>
              {this.renderAlumnos()}
            </tbody>
          </table>
          <hr />
          <h3>Método del cálculo de la nota</h3>
          <p>
            La nota es solo de este examen sin tener en cuenta el resto y es una estimación calculándose como <br />
            {"nota < 60% => 1"} <br />
            {"nota < 70% => 2"} <br />
            {"nota < 80% => 3"} <br />
            {"nota < 90% => 4"} <br />
            {"nota >= 90% => 5"}<br />
          </p>
          <hr />
          <div className="btn-group float-right ml-auto">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={()=>{this.setState({ datosExamen: false });}}>
              Cancelar
            </button>
            <button
              value="submit"
              type="button"
              className="btn btn-primary">Enviar</button>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ estudiantesParaCargar, materia }) {
  return { estudiantesParaCargar, materia };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMateria: getMateria,
    getAlumnosParaCargar: getAlumnosParaCargar
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CargaNotas);
