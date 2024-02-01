import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarCom() {
  return (
    <Navbar expand="lg" className="" sticky='top' style={{backgroundColor:"midnightblue", color:"white"}}>
      <Container style={{color:"white"}}>
        <Navbar.Brand  style={{color:"white"}} href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse style={{color:"white"}} id="basic-navbar-nav">
          <Nav style={{color:"white"}} className="me-auto">
            <Nav.Link style={{color:"white"}}href="/">Home</Nav.Link>
            <Nav.Link style={{color:"white"}}href="/favorites">Favorites</Nav.Link>
         
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCom;