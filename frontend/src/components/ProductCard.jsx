import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  return (
    <div
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{ width: '100%', margin: '12px' }}
    >
      <Card
        className="h-100 shadow-sm border border-light"
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Link to={`/product/${product._id}`}>
          <Card.Img
            variant="top"
            src={product.image}
            style={{
              height: '220px',
              objectFit: 'contain',
              backgroundColor: '#f8f9fa',
              padding: '20px',
            }}
          />
        </Link>

        <Card.Body className="text-center">
          <Link to={`/product/${product._id}`} className="text-decoration-none">
            <Card.Title as="div" className="fw-semibold text-dark" style={{ minHeight: '50px' }}>
              {product.name}
            </Card.Title>
          </Link>

          <Card.Text as="div" className="mb-2">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </Card.Text>

          <Card.Text as="h5" className="fw-bold text-primary">
            ${product.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;

