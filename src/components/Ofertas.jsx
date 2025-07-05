import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Banner from './Banner';
import Paginador from './Paginador';

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
      {/* Paginación simple usando el componente Paginador */}
      <Paginador
        paginaActual={currentPage}
        totalPaginas={totalPages}
        cambiarPagina={(pagina) => setCurrentPage(Math.max(1, Math.min(pagina, totalPages)))}
      />
      
    </div>
  );
};

export default Ofertas;