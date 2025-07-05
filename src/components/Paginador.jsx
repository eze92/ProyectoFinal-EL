import React from 'react';

const Paginador = ({ paginaActual, totalPaginas, cambiarPagina }) => (
  <div className="d-flex justify-content-center mt-4">
    <button
      className="btn btn-outline-primary me-2"
      onClick={() => cambiarPagina(paginaActual - 1)}
      disabled={paginaActual === 1}
    >
      Anterior
    </button>
    <span className="align-self-center">Página {paginaActual}</span>
    <button
      className="btn btn-outline-primary ms-2"
      onClick={() => cambiarPagina(paginaActual + 1)}
      disabled={paginaActual === totalPaginas || totalPaginas === 0} // Desactiva si es la última
    >
      Siguiente
    </button>
  </div>
);

export default Paginador;