import React from 'react'
import { Row, Col, Card , Button} from 'react-bootstrap';


//se agregan las cards
const Ofertas = ({ productos, loading,onAgregarAlCarrito }) => {
  const productosOrdenados = [...productos].sort((a, b) => {
    if (a.price === 'N/A') return 1;
    if (b.price === 'N/A') return -1;
    return a.price - b.price;
  })
  .slice(0, 30); // Solo las 20 más baratas
  
  return (
    <div className="container">
    <h2>Mas Baratas</h2>
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

                  {/* Botón para agregar al carrito junto a div para centrar el boton */}
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="success" 
                      onClick={() => onAgregarAlCarrito(producto)}
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


export default Ofertas;
