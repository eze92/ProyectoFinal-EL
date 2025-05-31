import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className="d-flex flex-column min-vh-100">  {/* Contenedor envolvente */}
      <main className="flex-grow-1"> {/* Asegura que el contenido se expanda */}
        
      </main>
      <footer className="bg-black text-white text-center py-4 mt-auto"> {/* `mt-auto` fuerza el footer abajo */}
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-md-start text-center mb-3 mb-md-0">
              <p className="mb-1">Caseros, Buenos Aires, Argentina CP: B1678</p>
              <p className="mb-0">&copy; 2025 Ezequiel Ledesma</p>
              <p className="mb-0">Email: contacto@ejemplo.com</p>
              <p className="mb-0">Tel: +54 11 1234-5678</p>
            </Col>
            <Col md={6} className="text-md-end text-center">
              <span className="me-2">Seguinos:</span>
              <a href="https://facebook.com/" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="https://x.com/" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="https://instagram.com/" className="text-white" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
