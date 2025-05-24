import React, { useState } from 'react';
import ProductList from './ProductList';

const types = ['Fire', 'Water', 'Grass', 'Lightning', 'Psychic', 'Fighting', 'Darkness', 'Metal', 'Fairy', 'Dragon', 'Colorless'];

const Home = () => {
  const [selectedType, setSelectedType] = useState('');

  return (
    <div className="container" style={{ background: '#f5f7fa', borderRadius: '12px', padding: '2rem' }}>
    <div className="container">
      <h2>Top Cartas más Caras</h2>
      <div className="mb-3">
        <span>Filtrar por tipo: </span>
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
      <ProductList sortType="expensive" typeFilter={selectedType} />
    </div>
  </div>
  );
};

export default Home;