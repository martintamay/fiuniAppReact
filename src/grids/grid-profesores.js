import React, { Component } from 'react';
import Table from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//aca importas los metodos de actions
import { getProfesores } from '../actions';

//para ver esta pantalla tenes que agregar en el src/index.js como hicimos con los
//otros, en donde están los routes, después ya solo entrá al enlace que le pusiste
//podes ponerle a todos tipo /profesores /estudiantes /notas y así
class GridProfesores extends Component {
  // aca podes pedirle las cosas al servidor antes de que cargue la pantalla
  componentDidMount(){
    this.props.getProfesores();
  }

  //los formatters son funciones para cambiar como se muestran los datos
  //cell tiene el valor de esa celda en específico y row tiene todos los
  //valores de la fila, en este caso tiene el profesor
  renderButtons(cell, row){
    return (
      <Link to={`/profesores/${row.id}/editar`} className='btn btn-light'>
        Editar
      </Link>
    );
  }

  //devuelve la configuración de las columnas
  getColumns(){
    return [{
      dataField: 'id',
      text: '#ID',
      sort: true
    }, {
      dataField: 'person.names',
      text: 'Nombre',
      sort: true
    }, {
      dataField: 'person.email',
      text: 'Correo',
      sort: true
    }, {
      dataField: '',
      text: '',
      formatter: this.renderButtons
    }];
  }

  render(){
    //avisas que esta cargando si lo que le pediste a redux es null todavia
    if(this.props.profesores===null){
      return "Cargando...";
    }

    //ese return reemplazas retornando tu html entre parentesis
    //si pediste cosas de redux podes acceder haciendo this.props.loquepediste
    return (
      <Table keyField='id' data={ this.props.profesores } columns={ this.getColumns() } pagination={ paginationFactory() } />
    );
  }
}

//las cosas que queres traer del state de redux
//estos estan en el index de reducer la lista de lo que ya hay
function mapStateToProps({ profesores }) {
  return { profesores };
}

//los metodos que queres usar de actions para pedirle cosas al servidor
//acordate de importar los metodos arriba
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getProfesores: getProfesores
  }, dispatch)
}

//donde dice GridProfesores reemplaza con el nombre de tu class
export default connect(mapStateToProps, mapDispatchToProps)(GridProfesores);
