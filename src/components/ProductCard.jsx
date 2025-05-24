import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ producto, onAgregarAlCarrito }) => (
  <Card className="h-100 d-flex flex-column m-2">
    <Card.Img
      variant="top"
      src={producto.image}
      alt={producto.title}
      style={{ height: '200px', objectFit: 'contain' }}
    />
    <Card.Body className="d-flex flex-column">
      <Card.Title>{producto.title}</Card.Title>
      <Card.Text>
        <strong>Precio: ${producto.price}</strong>
      </Card.Text>
      <div className="d-flex justify-content-center mt-auto">
        <Button variant="success" onClick={() => onAgregarAlCarrito(producto)}>
          Agregar al carrito
        </Button>
      </div>
    </Card.Body>
  </Card>
);

export default ProductCard;