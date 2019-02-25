import React from 'react';

import GridMaterias from '../grids/grid-materias'

export default (props)=>{
    return (
      <section id="carga-materia">
        <div className="container card">
          <h2>Lista de Materias de Carrera</h2>
          <hr />
          <GridMaterias idCarrera={props.match.params.carrera_id}/>
        </div>
      </section>
    );
}
