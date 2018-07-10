import React, { Component } from 'react';
import { getMateriasACargo, getAlumnosParaCargar } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AlumnoCarga from '../components/alumno-carga'
import { Link } from 'react-router-dom';

class CargaNotas extends Component {
  constructor(props){
    super(props);

    this.state = {
      datosExamen: false,
      fechaExamen: "",
      tipoExamen: "PuntosParciales",
      tipo: "porcentaje",
      total: 0,
      puntos: {}
    }

    this.selectChangesHandler = this.selectChangesHandler.bind(this);
    this.onChangeTotal = this.onChangeTotal.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitTipoExamen = this.onSubmitTipoExamen.bind(this);
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

  onSubmitTipoExamen(event){
    event.preventDefault();
    this.setState({ datosExamen: true });
  }

  onChangeTotal(event){
    let total = parseInt(event.target.value, 10);
    if (isNaN(total)) {
      total = 0;
    }
    this.setState({ total });
  }

  onChangeHandler({ target }){
    switch (target.name) {
      case "fechaExamen":
        this.setState({ fechaExamen: target.value });
        break;
      case "tipoExamen":
        this.setState({ tipoExamen: target.value });
        break;
      default:

    }
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

  renderDatosExamen(){
    return (
      <section id="datos-examen">
        <div className="container card">
          <form onSubmit={this.onSubmitTipoExamen}>
            <h1>Datos del Examen</h1>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label htmlFor="fecha">Fecha</label>
                <input type="date"
                  className="form-control"
                  id="fecha"
                  name="fechaExamen"
                  value={this.state.fechaExamen}
                  onChange={this.onChangeHandler}
                  required/>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="tipo">Tipo de Examen</label>
                <select className="form-control"
                  name="tipoExamen"
                  id="tipoExamen"
                  value={this.state.tipoExamen}
                  onChange={this.onChangeHandler}>
                  <option value="PuntosParciales">Parcial</option>
                  <option value="Final">Final</option>
                </select>
              </div>
            </div>
            <div className="float-right ml-auto">
              <button value="submit" className="btn btn-primary">
                Guardar
              </button>
              <Link to="/" className="btn btn-secondary">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </section>
    );
  }

  render(){
    if (false && this.props.alumnosParaCargar!==null) {
      console.log("state", this.state);
      console.log("alumnos para carga", this.props.alumnosParaCargar);
    }


    if(!this.state.datosExamen){
      return this.renderDatosExamen();
    }
    if(this.props.alumnosParaCargar===null){
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
                <th scope="col">Nota (de este examen)</th>
              </tr>
            </thead>
            <tbody>
              {this.renderAlumnos()}
            </tbody>
          </table>
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
