import React from 'react';
import ProductList from './ProductList';

const Ofertas = () => {
  return (
    <div className="container">
      <h2>Más Baratas</h2>
      <ProductList sortType="cheap" />
    </div>
  );
};

export default Ofertas;