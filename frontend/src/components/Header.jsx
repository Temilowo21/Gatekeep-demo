import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/images/logo.jpg" // ✅ Use direct path
              alt="GateKeep Logo"
              style={{ height: '40px', marginRight: '10px' }}
            />
            GateKeep
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart className="me-2" /> Cart
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                <FaUser className="me-2" /> Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
