import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  Rating from './Rating'
const Product = ({ product }) => {
    return (
        <Card className='my-3 p-2 rounded shadow-sm text-center' style={{ width: '18rem' }}>
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    src={product.image}
                    variant='top'
                    style={{ height: '180px', objectFit: 'contain', padding: '10px' }}
                />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div' style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        {product.name}
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <Rating value={product.rating} 
                    text={`${product.numReviews} reviews`} />
                </Card.Text>

                <Card.Text as='h3' style={{ fontSize: '1.2rem', color: '#333' }}>${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
