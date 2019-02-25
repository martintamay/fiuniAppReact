import React from 'react';

import GridCarreras from '../grids/grid-carreras'

export default (props)=>{
    return (
      <section id="carga-materia">
        <div className="container card">
          <h2>Lista de Carreras</h2>
          <hr />
          <GridCarreras />
        </div>
      </section>
    );
}
