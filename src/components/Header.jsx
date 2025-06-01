import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './CardContex';

const Header = () => {
  const { carrito } = useContext(CartContext);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FontAwesomeIcon icon={faGamepad} size="2x" className="me-2" />
          <span>PokéBazar Mercado Especializado en Cartas </span>
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/" className="me-3">Home</Nav.Link>
          <Nav.Link as={Link} to="/ofertas" className="me-3">Ofertas</Nav.Link>
          <Nav.Link as={Link} to="/comojugar" className="me-3">Como Jugar</Nav.Link>

          <div className="d-flex align-items-center">
            {/* Botón de inicio de sesión */}
            <Button variant="outline-light bg-danger text-white" as={Link} to="/login" className="me-2">
              Login
            </Button>
            {/* Carrito de compras */}
            <Link to="/carrito" className="text-muted position-relative">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {/*maneja el total en el icono del carrito*/}
              {totalItems > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;