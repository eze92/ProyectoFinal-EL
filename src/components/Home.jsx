import React, { useState , useEffect} from 'react';
import ProductList from './ProductList';
import Banner from './Banner';

// Lista de tipos de cartas 
const types = ['Fire', 'Water', 'Grass', 'Lightning', 'Psychic', 'Fighting', 'Darkness', 'Metal', 'Fairy', 'Dragon', 'Colorless'];

const Home = () => {
  const [selectedType, setSelectedType] = useState('');
  //para paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Scroll automático al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Para saber cuántas cartas hay en total según el filtro y orden, puedes calcularlo aquí si tienes acceso a los datos.
  // Si no, puedes calcular el total en ProductList y pasarlo a Home mediante un callback o prop.

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
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => setSelectedType('')}
        >
          Todos
        </button>
      </div>
      <ProductList 
        sortType="expensive" 
        typeFilter={selectedType} 
        currentPage={currentPage}
        itemsPerPage={itemsPerPage} 
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
            // Puedes deshabilitar el botón si no hay más cartas en la siguiente página
            // disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
    </div>
  </div>
  );
};

export default Home;