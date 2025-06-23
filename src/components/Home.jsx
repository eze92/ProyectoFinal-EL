import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Banner from './Banner';

const types = ['Fire', 'Water', 'Grass', 'Lightning', 'Psychic', 'Fighting', 'Darkness', 'Metal', 'Fairy', 'Dragon', 'Colorless'];

const Home = () => {
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  // Nuevo: estado para el total de cartas filtradas
  const [totalCartas, setTotalCartas] = useState(0);
  // Nuevo: calcula el total de páginas
  const totalPages = Math.ceil(totalCartas / itemsPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="container" style={{ background: '#f5f7fa', borderRadius: '12px', padding: '2rem' }}>
      <div className="container">
        <Banner />
        <h2>Top Cartas más Caras</h2>
        <div className="mb-3">
          <span>Filtrar Tipo de Carta: </span>
          {types.map((type) => (
            <button
              key={type}
              className={`btn btn-sm me-2 ${selectedType === type ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => {
                setSelectedType(type);
                setCurrentPage(1); // Reinicia paginación al cambiar filtro
              }}
            >
              {type}
            </button>
          ))}
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => {
              setSelectedType('');
              setCurrentPage(1); // Reinicia paginación al quitar filtro
            }}
          >
            Todos
          </button>
        </div>
        <ProductList
          sortType="expensive"
          typeFilter={selectedType}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onTotalChange={setTotalCartas} // Nuevo: recibe el total de cartas filtradas
        />
        {/* Paginación simple */}
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
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;