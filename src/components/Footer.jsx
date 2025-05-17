import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-4 mt-4">
      <Container>
        <Row >
            <p>Caseros Buenos Aires Argentina CP: B1678</p>
            <p>Copyright 2025 : Ezequiel Ledesma</p>
        
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
          
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
