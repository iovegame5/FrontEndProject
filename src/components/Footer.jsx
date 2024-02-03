import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="footer mt-4 py-3" style={{color:"white", background:"midnightblue"}}>
      <Container>
        <Row>
          <Col>
            <p>BorntoDev Front End Internship 2024 Project</p>
          </Col>
          <Col>
            <p className="float-end">Thanakorn Amatrawet</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
