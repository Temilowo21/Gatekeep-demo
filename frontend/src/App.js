import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />  {/* ✅ This allows dynamic page rendering */}
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
