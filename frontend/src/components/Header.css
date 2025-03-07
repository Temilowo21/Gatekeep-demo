import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import './Header.css';

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className="brand">
              <img src="/logo.png" alt="GateKeep Logo" className="logo" />
              <span>GATEKEEP</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to='/cart'>
                <Nav.Link className="nav-link-custom">
                  <FaShoppingCart className="me-2" /> Cart
                </Nav.Link>
              </LinkContainer>
              
              {/* ✅ User Dropdown Menu */}
              <NavDropdown title={<><FaUser className="me-2" /> Account</>} id="username">
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
