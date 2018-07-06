import React, { Component } from 'react';
import { getMateriasCursandose } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class MateriasCursandose extends Component {
  componentDidMount(){
    /*if(this.props.usuario===null || this.props.usuario===undefined){
      if(localStorage.getItem("session_token")!=null){
        this.props.recuperarLogueo(localStorage.getItem("session_token"));
      }
    }*/
    this.props.getMateriasCursandose(this.props.match.params.user_id);
  }

  renderMaterias(){
    let materias = this.props.materiasCursandose;
    return materias.map((materia)=>{
      return (
        <li className="list-group-item" key={materia.id}>
          {materia.name}
        </li>
      );
    });
  }

  render(){
    if(this.props.materiasCursandose===null){
      return (
        <section id="materias-cursandose">
          <div className="container">
            <h1>Materias Cursándose</h1>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Cargando
              </li>
            </ul>
          </div>
        </section>
      );
    }
    return (
      <section id="materias-cursandose">
        <div className="container">
          <h1>Materias Cursándose</h1>
          <ul className="list-group list-group-flush">
            {this.renderMaterias()}
          </ul>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ materiasCursandose }) {
  return { materiasCursandose };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMateriasCursandose: getMateriasCursandose
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MateriasCursandose);
