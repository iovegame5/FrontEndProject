import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3" style={{color:"white", borderTop:"2px solid black"}}>
      <Container>
        <Row>
          <Col>
            <p>© 2024 Your Company</p>
          </Col>
          <Col>
            <p className="float-end">Designed by You</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
