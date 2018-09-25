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
      <a className='btn btn-danger'>
        Inscribirse
      </a>
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
    //avisas que esta cargando si lo que le pediste a redux es null todavia
    if(this.props.examenes===null){
      return "Cargando...";
    }
    console.log("GridED examenes", this.props.examenes);
    console.log("GridED materias", this.props.materias);
    //con console.log imprimis cosas en el log, en firefox o chrome hace click
    //derecho inspeccionar y debe haber una pertaña que se llama consola y ahí
    //aparece. Después de terminar las pantallas sacá nomas este log para que no
    //imprima cosas en consola al pedo

    //ese return reemplazas retornando tu html entre parentesis
    //si pediste cosas de redux podes acceder haciendo this.props.loquepediste
    return (
      <Table keyField='id' data={ this.props.examenes } columns={ this.getColumns() } pagination={ paginationFactory() } />
    );
  }
}
