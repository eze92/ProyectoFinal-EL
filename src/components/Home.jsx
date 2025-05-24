import React from 'react';
import ProductList from './ProductList';

const Home = () => (
  <div className="container">
    <h2>Top 100 cartas más caras</h2>
    <ProductList sortType="expensive" />
  </div>
);

export default Home;