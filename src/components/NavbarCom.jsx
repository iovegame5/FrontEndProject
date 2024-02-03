import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

function YourNavbar() {
  return (
    <Navbar style={{background:"midnightblue", textAlign:"center", border:"none"}} expand="lg" variant="dark" sticky="top">
      <Container style={{color:"white"}}>
        <Navbar.Brand style={{color:"white"}} href="/">
          <img alt="" src="/pokeball.png" width="30" height="30"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" variant="dark" className="custom-toggler" />
        <Navbar.Collapse  id="basic-navbar-nav">
          <Nav style={{}} className="me-auto">
            <Nav.Link style={{color:"white"}} href="/">Pokédex</Nav.Link>
            <Nav.Link style={{color:"white"}} href="/favorites">Favorites</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default YourNavbar;
