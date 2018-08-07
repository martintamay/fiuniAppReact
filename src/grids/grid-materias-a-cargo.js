import React, { Component } from 'react';
import Table from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//aca importas los metodos de actions
import { getCarreras } from '../actions';

//para ver esta pantalla tenes que agregar en el src/index.js como hicimos con los
//otros, en donde están los routes, después ya solo entrá al enlace que le pusiste
//podes ponerle a todos tipo /profesores /estudiantes /notas y así
class GridMaterias extends Component {
  constructor(props){
    super(props);

    this.carreraFormatter = this.carreraFormatter.bind(this);
  }
  // aca podes pedirle las cosas al servidor antes de que cargue la pantalla
  componentDidMount(){
    this.props.getCarreras();
  }

  //los formatters son funciones para cambiar como se muestran los datos
  //cell tiene el valor de esa celda en específico y row tiene todos los
  //valores de la fila, en este caso tiene el profesor
  renderButtons(cell, row){
    var fecha = new Date();
    var anho = fecha.getFullYear();
    return (
      <Link to={`/materias/${row.id}/notas/${anho}`} className='btn btn-light'>
        Revisar
      </Link>
    );
  }

  carreraFormatter(cell, row){
    return this.props.carreras!==null ? this.props.carreras[cell].description : cell;
  }

  //devuelve la configuración de las columnas
  getColumns(){
    return [{
      dataField: 'id',
      text: '#ID',
      sort: true
    }, {
      dataField: 'name',
      text: 'Materia',
      sort: true
    }, {
      dataField: 'semester',
      text: 'Semestre',
      sort: true
    }, {
      dataField: 'career_id',
      text: 'Carrera',
      formatter: this.carreraFormatter,
      sort: true
    }, {
      dataField: '',
      text: '',
      formatter: this.renderButtons
    }];
}

  render(){
    //avisas que esta cargando si lo que le pediste a redux es null todavia
    if(this.props.materias===null){
      return "Cargando...";
    }

    //con console.log imprimis cosas en el log, en firefox o chrome hace click
    //derecho inspeccionar y debe haber una pertaña que se llama consola y ahí
    //aparece. Después de terminar las pantallas sacá nomas este log para que no
    //imprima cosas en consola al pedo
    console.log("materias", this.props.materias);
    console.log("carreras", this.props.carreras);

    //ese return reemplazas retornando tu html entre parentesis
    //si pediste cosas de redux podes acceder haciendo this.props.loquepediste
    return (
      <Table keyField='id' data={ Object.values(this.props.materias) } columns={ this.getColumns() } pagination={ paginationFactory() } />
    );
  }
}

//las cosas que queres traer del state de redux
//estos estan en el index de reducer la lista de lo que ya hay
function mapStateToProps({ carreras }) {
  return { carreras };
}

//los metodos que queres usar de actions para pedirle cosas al servidor
//acordate de importar los metodos arriba
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCarreras: getCarreras
  }, dispatch)
}

//donde dice GridProfesores reemplaza con el nombre de tu class
export default connect(mapStateToProps, mapDispatchToProps)(GridMaterias);
