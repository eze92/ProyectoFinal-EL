import React from 'react';
import ProductList from './ProductList';

const Ofertas = () => {
  return (
    <div className="container"  style={{ background: '#f5f7fa', borderRadius: '12px', padding: '2rem' }}>
      <h2>Más Baratas</h2>
      <ProductList sortType="cheap" />
    </div>
  );
};

export default Ofertas;