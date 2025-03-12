import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../components/Footer.css'; // ✅ Ensure CSS is imported correctly

const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} GateKeep. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
