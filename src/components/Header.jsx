import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './CardContex';
import { useAuth } from './AuthContext';

const Header = () => {
  const { carrito } = useContext(CartContext);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FontAwesomeIcon icon={faGamepad} size="2x" className="me-2" />
          {/* Título largo solo en desktop */}
          <span className="d-none d-lg-inline">PokéBazar Mercado Especializado en Cartas</span>
          {/* Título corto solo en mobile */}
          <span className="d-inline d-lg-none">PokéBazar</span>
        </Navbar.Brand>
        {/* Botón hamburguesa con texto "Menú" visible solo en pantallas chicas */}
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="d-lg-none ms-2">Menú</span>
        </Navbar.Toggle>
        {/* Collapse para menú responsive */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* Enlaces de navegación principales alineados a la izquierda */}
            {/* QUITA d-flex align-items-center para que en móvil se vean en columna */}
            <Nav.Link as={Link} to="/" className="">Home</Nav.Link>
            <Nav.Link as={Link} to="/ofertas" className="">Ofertas</Nav.Link>
            <Nav.Link as={Link} to="/comojugar" className="">Como Jugar</Nav.Link>
            {/* Solo mostrar el link de administración si el usuario es admin */}
            {token && user === "admin" && (
              <Nav.Link as={Link} to="/admin" className="">Administración</Nav.Link>
            )}
            {/* Bloque de usuario y carrito */}
            <div className="d-flex align-items-center ms-4">
              {/* Si el usuario está logueado, muestra su nombre, link a perfil y el botón de cerrar sesión */}
              {token ? (
                <>
                {/*  <Navbar.Text className="me-3">
                    Usuario: <strong>{user}</strong>
                  </Navbar.Text>*/}
                  {/* Link al perfil solo si NO es admin */}
                  {user !== "admin" && (
                    <Button
                      variant="success text-white"
                      as={Link}
                      to={`/perfil/${user}`}
                      className="me-2"
                    >
                      Perfil
                    </Button>
                  )}
                  <Button variant="outline-light bg-danger text-white" onClick={handleLogout} className="me-2">
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                // Botón de inicio de sesión
                <Button variant="outline-light bg-danger text-white" as={Link} to="/login" className="me-2">
                  Login
                </Button>
              )}
              {/* Carrito de compras */}
              <Link to="/carrito" className="text-muted position-relative">
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                {/* Mostrar badge solo si hay productos en el carrito */}
                {totalItems > 0 && (
                  <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;