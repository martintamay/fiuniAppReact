import React, { Component } from 'react';
import { updateMateria, getMateria } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FormMateria from '../forms/form-materia';

class EditarMateria extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.materia===null ||
      this.props.materia.id!==Number(this.props.match.params.materia_id)){
      this.props.getMateria(this.props.match.params.materia_id);
    }
  }


  onSubmit(materia){
    this.props.updateMateria(materia);
  }

  render(){
    if(this.props.materia===null ||
      this.props.materia.id!==Number(this.props.match.params.materia_id)){
      return (
        <section id="editar-materia">
          <div className="container card">
            <h1>Editar Materia</h1>
            <hr/>
            Cargando...
          </div>
        </section>
      );
    }
    return (
      <section id="editar-materia">
          <div className="container card">
            <h1>Editar Materia</h1>
            <hr />
            <FormMateria onSubmit={this.onSubmit} materia={this.props.materia} />
          </div>
      </section>

    );
  }
}

function mapStateToProps({ materia }) {
  return { materia };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateMateria: updateMateria,
    getMateria: getMateria
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditarMateria);
