import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ sortType }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.pokemontcg.io/v2/cards', {
      headers: {
        'X-Api-Key': 'a46093c9-caec-4f2f-b2cc-15d55e6776d2',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const productosTransformados = data.data.map((card) => ({
          id: card.id,
          title: card.name,
          image: card.images.large,
          price:
            card.tcgplayer?.prices?.normal?.market ||
            card.cardmarket?.prices?.averageSellPrice ||
            'N/A',
        }));
        setProducts(productosTransformados);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleAgregarAlCarrito = (product) => {
    alert(`Producto ${product.title} agregado al carrito`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Ordenar según sortType
  let productosOrdenados = [...products].filter(p => p.price !== 'N/A');
  if (sortType === 'cheap') {
    productosOrdenados.sort((a, b) => a.price - b.price);
    productosOrdenados = productosOrdenados.slice(0, 30); // 30 más baratas
  } else if (sortType === 'expensive') {
    productosOrdenados.sort((a, b) => b.price - a.price);
    productosOrdenados = productosOrdenados.slice(0, 100); // 100 más caras
  }

  return (
    <Row>
      {productosOrdenados.map((product) => (
        <Col md={3} key={product.id} className="mb-4">
          <ProductCard producto={product} onAgregarAlCarrito={handleAgregarAlCarrito} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;