import React from 'react';
import { Card, Button,Badge } from 'react-bootstrap';

const ProductCard = ({ producto, onAgregarAlCarrito, cantidadAgregada }) => (
  <Card className="h-100 d-flex flex-column m-2" style={{ backgroundColor: '#999CF5' }}>
    <Card.Img
      variant="top"
      src={producto.image}
      alt={producto.title}
      style={{ height: '200px', objectFit: 'contain' }}
      loading="lazy" // <-- Esto habilita lazy loading
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
      {/* Nuevo: muestra la cantidad agregada solo si es mayor a 0 y en un campo de color */}
       {cantidadAgregada > 0 && (
        <div className="text-center mt-2">
          <Badge bg="dark" style={{ fontSize: '1rem', padding: '0.5em 1em',fontWeight: 'normal' }}>
            Agregados: {cantidadAgregada}
          </Badge>
        </div>
      )}
         
      {/* Antes se mostraba siempre y sin color:
      <div className="text-center mt-2">
        Agregados: {cantidadAgregada}
      </div>
      */}
    </Card.Body>
  </Card>
);

export default ProductCard;