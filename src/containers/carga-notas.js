import React, { Component } from 'react';
import { getMateriasACargo, getAlumnosParaCargar } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AlumnoCarga from '../components/alumno-carga'

/**
 * TODO: Terminar
 */

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
    this.props.getAlumnosParaCargar(this.props.match.params.materia_id);
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
    let cursadas = this.props.alumnosParaCargar;
    return cursadas.map((cursada)=>{
      return <AlumnoCarga
        cursada={cursada}
        key={cursada.id}
        totalPuntos={this.state.total}/>
    });
  }

  render(){
    if (this.props.alumnosParaCargar!==null) {
      console.log("state", this.state);
      console.log("alumnos para carga", this.props.alumnosParaCargar);
    }
    if(this.props.alumnosParaCargar===null){
      return (
        <section id="materias-cursandose">
          <div className="container">
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
        <div className="container">
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
                <th scope="col">Nota (de este examen)</th>
              </tr>
            </thead>
            <tbody>
              {this.renderAlumnos()}
            </tbody>
          </table>
          <hr />
          <div className="btn-group float-right">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={()=>{window.history.back(1)}}>
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary">Enviar</button>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ alumnosParaCargar }) {
  return { alumnosParaCargar };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMateriasACargo: getMateriasACargo,
    getAlumnosParaCargar: getAlumnosParaCargar
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CargaNotas);
