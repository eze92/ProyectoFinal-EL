import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

const Set = ({ onAgregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cambia el filtro aquí para que sea diferente al de Home
    fetch('https://api.pokemontcg.io/v2/cards?rarity=Rare&set.id=base1', {
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
        setProductos(productosTransformados);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error de carga de API', err);
        setLoading(false);
      });
  }, []);

  const productosOrdenados = [...productos]
    .sort((a, b) => {
      if (a.price === 'N/A') return 1;
      if (b.price === 'N/A') return -1;
      return b.price - a.price;
    })
    .slice(0, 100);

  return (
    <div className="container">
      <h2>Cartas Rare del Base Set</h2>
      {loading ? (
        <h2>Cargando Imágenes...</h2>
      ) : (
        <Row>
          {productosOrdenados.map((producto) => (
            <Col key={producto.id} md={3}>
              <Card className="m-2">
                <Card.Img
                  variant="top"
                  src={producto.image}
                  alt={producto.title}
                  style={{ height: '200px', objectFit: 'contain' }}
                />
                <Card.Body>
                  <Card.Title>{producto.title}</Card.Title>
                  <Card.Text>
                    <strong>Precio: ${producto.price}</strong>
                  </Card.Text>
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="success"
                      onClick={() => onAgregarAlCarrito && onAgregarAlCarrito(producto)}
                    >
                      Agregar al carrito
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Set;