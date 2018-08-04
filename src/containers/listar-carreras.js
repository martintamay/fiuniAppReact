import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getCarreras } from '../actions';

class ListarCarreras extends Component {
  constructor(props){
    super(props);

    this.renderCarreras = this.renderCarreras.bind(this);
  }

  componentDidMount(){
    if(this.props.carreras===null){
      this.props.getCarreras();
    }
  }

  renderCarreras(){
    let carreras = this.props.carreras;
    if (carreras!==null) {
      return Object.keys(carreras).map(function(id, index) {
        let carrera = carreras[id];
        return (
          <tr key={id}>
            <th scope="row">{id}</th>
            <td>{carrera.description}</td>
            <td>
              <Link className="btn btn-light" to={`/editar-carrera/${id}`} >Editar</Link>
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <th colSpan="3">Cargando</th>
        </tr>
      );
    }
  }

  render(){
    return (
      <section id="carga-materia">
        <div className="container card">
          <h2>Lista de Carreras</h2>
          <hr />
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">Descripción</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.renderCarreras()}
            </tbody>
          </table>
          <div className="btn-group ml-auto">
            <button className="btn btn-primary">Agregar</button>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ carreras }) {
  return { carreras };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCarreras: getCarreras
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarCarreras);
