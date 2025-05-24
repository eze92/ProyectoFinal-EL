import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ sortType, typeFilter }) => {
  const [cartas, setCartas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = 'https://api.pokemontcg.io/v2/cards?pageSize=100';
    if (typeFilter) {
      url += `&q=types:${typeFilter}`;
    }
    fetch(url, {
      headers: {
        'X-Api-Key': 'a46093c9-caec-4f2f-b2cc-15d55e6776d2',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const cartasTransformadas = data.data.map((card) => ({
          id: card.id,
          title: card.name,
          image: card.images.small,
          price:
            card.tcgplayer?.prices?.normal?.market ||
            card.cardmarket?.prices?.averageSellPrice ||
            'N/A',
        }));
        setCartas(cartasTransformadas);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [typeFilter]);

  const handleAgregarAlCarrito = (carta) => {
    alert(`Carta ${carta.title} agregado al carrito`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Ordenar según sortType
  let cartasOrdenadas = [...cartas].filter(c => c.price !== 'N/A');
  if (sortType === 'cheap') {
    cartasOrdenadas.sort((a, b) => a.price - b.price);
    cartasOrdenadas = cartasOrdenadas.slice(0, 30); // 30 más baratas
  } else if (sortType === 'expensive') {
    cartasOrdenadas.sort((a, b) => b.price - a.price);
    cartasOrdenadas = cartasOrdenadas.slice(0, 100); // 100 más caras
  }

  return (
    <Row>
      {cartasOrdenadas.map((carta) => (
        <Col md={3} key={carta.id} className="mb-4">
          <ProductCard producto={carta} onAgregarAlCarrito={handleAgregarAlCarrito} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;