import React, { Component } from 'react';
import Table from 'react-bootstrap-table-next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//aca importas los metodos de actions
import { getProfesores } from '../actions';

class GridProfesores extends Component {
  // aca podes pedirle las cosas al servidor antes de que cargue la pantalla
  componentDidMount(){
    this.props.getProfesores();
  }

  render(){
    //avisas que esta cargando si lo que le pediste a redux es null todavia
    if(this.props.profesores===null){
      return "Cargando...";
    }

    //ese return reemplazas retornando tu html entre parentesis
    //si pediste cosas de redux podes acceder haciendo this.props.loquepediste
    return (
      <p> Pantalla sin nada </p>
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
    loguear: loguear
  }, dispatch)
}

//donde dice GridProfesores reemplaza con el nombre de tu class
export default connect(mapStateToProps, mapDispatchToProps)(GridProfesores);
