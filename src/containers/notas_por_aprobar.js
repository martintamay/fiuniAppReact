import React, { Component } from 'react';
import { getNotasPorAprobar } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RevisionMateria from '../components/revision-materia';

class NotasPorAprobar extends Component {
  constructor(props){
    super(props);

    this.state = {
      notasCorrigiendose: null
    }

    this.guardar = this.guardar.bind(this);
  }

  componentDidMount(){
    this.props.getNotasPorAprobar();
  }

  guardar(notes){
    console.log(notes);
  }

  renderNotas(notes){
    if(notes === null){
      return (<tr><td colSpan="3">Cargando...</td></tr>);
    }
    return notes.map((note)=>{
      return (
        <tr key={`npa-${note.subject.id}-${note.takenDate}`}>
          <td>{note.subject.name}</td>
          <td>{note.takenDate}</td>
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
        <div className="container">
          <h1>Notas por aprobar</h1>
          <hr />
          <table className="table table-striped table-bordered tabla-notas">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.renderNotas(this.props.notasPorAprobar)}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ usuario, notasPorAprobar }) {
  return { usuario, notasPorAprobar };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getNotasPorAprobar: getNotasPorAprobar
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NotasPorAprobar);
