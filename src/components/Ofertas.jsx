import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Banner from './Banner';

const Ofertas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [totalCartas, setTotalCartas] = useState(0); // Nuevo estado
  const totalPages = Math.ceil(totalCartas / itemsPerPage); // Calcula total de páginas

  // Scroll automático al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="container" style={{ background: '#f5f7fa', borderRadius: '12px', padding: '2rem' }}>
      <Banner />
      <h2>Ofertas</h2>
      <ProductList
        sortType="cheap"
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onTotalChange={setTotalCartas} // Pasa el setter
      />
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="align-self-center">Página {currentPage}</span>
        <button
          className="btn btn-outline-primary ms-2"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || totalPages === 0} // Desactiva si es la última
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Ofertas;