import React, { Component } from 'react';
import Table from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//aca importas los metodos de actions
import { getMaterias, getExamenes, getCarreras } from '../actions';

//para ver esta pantalla tenes que agregar en el src/index.js como hicimos con los
//otros, en donde están los routes, después ya solo entrá al enlace que le pusiste
//podes ponerle a todos tipo /profesores /estudiantes /notas y así
class GridMaterias extends Component {
  constructor(props){
    super(props);

    this.renderButtons = this.renderButtons.bind(this);
    this.carreraFormatter = this.carreraFormatter.bind(this);
    this.materiaFormatter = this.materiaFormatter.bind(this);
  }
  // aca podes pedirle las cosas al servidor antes de que cargue la pantalla
  componentDidMount(){
    this.props.getMaterias();
    this.props.getCarreras();
    if(this.props.idmateria){
      this.props.getExamenes(this.props.idmateria);
    }else{
      this.props.getExamenes();
    }
  }

  //los formatters son funciones para cambiar como se muestran los datos
  //cell tiene el valor de esa celda en específico y row tiene todos los
  //valores de la fila, en este caso tiene el profesor
  renderButtons(cell, row){
    if(this.props.idmateria === undefined ){
      return (
        <Link to={`/examenes/${row.id}/editar`} className='btn btn-light'>
          Editar
        </Link>
      );
    } else {
      return (
        <Link to={`/examenes/${row.id}/cargar`} className='btn btn-light'>
          Cargar Notas
        </Link>
      );
    }
  }

  materiaFormatter(cell, row){
    return this.props.materias!==null ? this.props.materias[cell].name : cell;
  }
  carreraFormatter(cell, row){
    return this.props.carreras!==null ? this.props.carreras[cell].description : cell;
  }

  //devuelve la configuración de las columnas
  getColumns(){
    let columns = [{
      dataField: 'id',
      text: '#ID',
      sort: true
    }, {
      dataField: 'examination_date',
      text: 'Fecha',
      sort: true
    }, {
      dataField: 'subject.id',
      text: 'Materia',
      formatter: this.materiaFormatter,
      sort: true
    }, {
      dataField: 'subject.career.id',
      text: 'Carrera',
      formatter: this.carreraFormatter,
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
    if(this.props.idmateria !== undefined){
      columns.splice(2, 2);
    }
    return columns;
}

  render(){
    //avisas que esta cargando si lo que le pediste a redux es null todavia
    if(this.props.examenes===null){
      return "Cargando...";
    }

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

//las cosas que queres traer del state de redux
//estos estan en el index de reducer la lista de lo que ya hay
function mapStateToProps({ examenes, materias, carreras }) {
  return { examenes, materias, carreras };
}

//los metodos que queres usar de actions para pedirle cosas al servidor
//acordate de importar los metodos arriba
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMaterias: getMaterias,
    getCarreras: getCarreras,
    getExamenes: getExamenes
  }, dispatch)
}

//donde dice GridProfesores reemplaza con el nombre de tu class
export default connect(mapStateToProps, mapDispatchToProps)(GridMaterias);
