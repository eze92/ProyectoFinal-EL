import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-info text-black text-center py-4 mt-4">
      <Container>
        <Row>
          <Col md={6}>
            <p className="mb-0 text-center">Caseros Buenos Aires Argentina CP: B1678</p>
            <p className="mb-0 text-center">Copyright 2025 :Diseño y Programación: Ezequiel Ledesma</p>
        </Col>
          <Col md={6}>
            <div>
              <a href="#" className="text-white me-3">
                <i className="fa fa-facebook fa-2x"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fa fa-twitter fa-2x"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fa fa-instagram fa-2x"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
