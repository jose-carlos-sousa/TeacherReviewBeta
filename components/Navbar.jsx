"use client"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNav() {
  return (
    <div>
       
        
    
   <Navbar expand="lg" className=" bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Prof Review FEUP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/Comments">Comments</Nav.Link>
            <Nav.Link href="/Ranking">Ranking</Nav.Link>
           
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar></div>
   
  );
}

export default MyNav;