import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const Home = ({ productos, loading }) => {
  return (
    <div className="container">
      <h1>Productos</h1>
      {loading ? (
        <h2>Cargando Imágenes...</h2>
      ) : (
        <Row>
          {productos.map((producto) => (
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
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Home;
