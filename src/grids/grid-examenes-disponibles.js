import React, { Component } from 'react';
import Table from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default class GridExamenesDisponibles extends Component {
  constructor(props){
    super(props);

    this.renderButtons = this.renderButtons.bind(this);
    this.carreraFormatter = this.carreraFormatter.bind(this);
    this.materiaFormatter = this.materiaFormatter.bind(this);
  }

  renderButtons(cell, row){
    return (
      <button
        className='btn btn-light'
        onClick={()=>this.props.inscribir(row) }>
        Inscribirse
      </button>
    );
  }

  materiaFormatter(cell, row){
    return this.props.materias!==null ? this.props.materias[cell].name : cell;
  }
  carreraFormatter(cell, row){
    return this.props.carreras!==null ? this.props.carreras[cell].description : cell;
  }

  getColumns(){
    return [{
      dataField: 'id',
      text: '#ID',
      sort: true
    }, {
      dataField: 'examination_date',
      text: 'Fecha del Examen',
      sort: true
    }, {
      dataField: 'subject.id',
      text: 'Materia',
      formatter: this.materiaFormatter,
      sort: true
    }, {
      dataField: 'examination_type',
      text: 'Tipo',
      sort: true
    }, {
      dataField: '',
      text: '',
      formatter: this.renderButtons
    }];
}

  render(){
    if(this.props.examenes===null){
      return "Cargando...";
    }
    return (
      <Table keyField='id' data={ this.props.examenes } columns={ this.getColumns() } pagination={ paginationFactory() } />
    );
  }
}
