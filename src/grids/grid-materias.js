import React, { Component } from 'react';
import Table from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//aca importas los metodos de actions
import { getMaterias, getCarreras } from '../actions';
import { isAdmin } from '../utils';

const anho  = new Date().getFullYear();

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
    this.props.getMaterias();
  }

  //los formatters son funciones para cambiar como se muestran los datos
  //cell tiene el valor de esa celda en específico y row tiene todos los
  //valores de la fila, en este caso tiene el profesor
  renderButtons(cell, row){
    return (
      <div className="btn btn-group">
        <Link to={`/materias/${row.id}/editar`} className='btn btn-light'>
          Editar
        </Link>
        <Link to={`/materias/${row.id}/notas/${anho}`} className='btn btn-light'>
          Revisar
        </Link>
      </div>
    );
  }

  carreraFormatter(cell, row){
    return this.props.carreras!==null ? this.props.carreras[cell].description : cell;
  }

  //devuelve la configuración de las columnas
  getColumns(){
    let campos = [{
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
      dataField: 'career.id',
      text: 'Carrera',
      formatter: this.carreraFormatter,
      sort: true
    }];
    if(isAdmin(this.props.usuario)){
      campos.push({
        dataField: '',
        text: '',
        formatter: this.renderButtons
      });
    }
    return campos;
}

  render(){
    //avisas que esta cargando si lo que le pediste a redux es null todavia
    if(this.props.materias===null){
      return "Cargando...";
    }

    //ese return reemplazas retornando tu html entre parentesis
    //si pediste cosas de redux podes acceder haciendo this.props.loquepediste
    return (
      <Table keyField='id' data={ Object.values(this.props.materias) } columns={ this.getColumns() } pagination={ paginationFactory() } />
    );
  }
}

//las cosas que queres traer del state de redux
//estos estan en el index de reducer la lista de lo que ya hay
function mapStateToProps({ materias, carreras, usuario }) {
  return { materias, carreras, usuario };
}

//los metodos que queres usar de actions para pedirle cosas al servidor
//acordate de importar los metodos arriba
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMaterias: getMaterias,
    getCarreras: getCarreras
  }, dispatch)
}

//donde dice GridProfesores reemplaza con el nombre de tu class
export default connect(mapStateToProps, mapDispatchToProps)(GridMaterias);
