import React, { Component } from 'react';
import Table from 'react-bootstrap-table-next';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//aca importas los metodos de actions
import { getEstudiantes } from '../actions';

//para ver esta pantalla tenes que agregar en el src/index.js como hicimos con los
//otros, en donde están los routes, después ya solo entrá al enlace que le pusiste
//podes ponerle a todos tipo /profesores /estudiantes /notas y así
class GridEstudiantes extends Component {
  // aca podes pedirle las cosas al servidor antes de que cargue la pantalla
  componentDidMount(){
    this.props.getEstudiantes();
  }

  //los formatters son funciones para cambiar como se muestran los datos
  //cell tiene el valor de esa celda en específico y row tiene todos los
  //valores de la fila, en este caso tiene el profesor
  renderButtons(cell, row){
    return (
      <Link to={`/student/${row.id}/editar`} className='btn btn-light'>
        Editar
      </Link>
    );
  }

  //devuelve la configuración de las columnas
  getColumns(){
    return [{
      dataField: 'id',
      text: '#ID'
    }, {
      dataField: 'person.names',
      text: 'Nombre'
    }, {
      dataField: 'person.email',
      text: 'Correo'
    }, {
      dataField: 'entry_year',
      text: 'Ingreso'
    }, {
      dataField: 'career.description',
      text: 'Carrera'
      }, {
    dataField: '',
    text: '',
    formatter: this.renderButtons
  }];
}

  render(){
    //avisas que esta cargando si lo que le pediste a redux es null todavia
    if(this.props.estudiantes===null){
      return "Cargando...";
    }

    //con console.log imprimis cosas en el log, en firefox o chrome hace click
    //derecho inspeccionar y debe haber una pertaña que se llama consola y ahí
    //aparece. Después de terminar las pantallas sacá nomas este log para que no
    //imprima cosas en consola al pedo
    console.log("estudiantes", this.props.estudiantes);

    //ese return reemplazas retornando tu html entre parentesis
    //si pediste cosas de redux podes acceder haciendo this.props.loquepediste
    return (
      <Table keyField='id' data={ this.props.estudiantes } columns={ this.getColumns() } />
    );
  }
}

//las cosas que queres traer del state de redux
//estos estan en el index de reducer la lista de lo que ya hay
function mapStateToProps({ estudiantes }) {
  return { estudiantes };
}

//los metodos que queres usar de actions para pedirle cosas al servidor
//acordate de importar los metodos arriba
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getEstudiantes: getEstudiantes
  }, dispatch)
}

//donde dice GridProfesores reemplaza con el nombre de tu class
export default connect(mapStateToProps, mapDispatchToProps)(GridEstudiantes);
