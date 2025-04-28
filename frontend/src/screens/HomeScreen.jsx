import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useParams, Link } from 'react-router-dom';
import Paginate from '../components/Pagination';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword: keyword || '',
    pageNumber: pageNumber || 1,
  });

  return (
    <>
      {/* Inline CSS Styling */}
      <style>{`
        .loading-text, .error-message {
          text-align: center;
          margin-top: 50px;
          font-size: 24px;
        }

        .loading-text {
          animation: blink 1.5s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .error-message {
          color: red;
          font-weight: bold;
        }

        .page-title {
          margin: 30px 0 20px;
          text-align: center;
          font-weight: bold;
          font-size: 32px;
        }

        .pagination-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 40px;
          margin-bottom: 50px;
        }

        .product-card {
          padding: 15px;
          border-radius: 15px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          background: #fff;
          transition: all 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        /* Optional overall page background */
        body {
          background-color: #f9f9f9;
        }

        /* Carousel wrapper styling */
        .carousel-wrapper {
          max-width: 1000px;
          margin: 20px auto 40px;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .carousel-wrapper img {
          object-fit: cover;
          width: 100%;
          height: 450px;
        }
      `}</style>

      {!keyword ? (
        <div className="carousel-wrapper">
          <ProductCarousel />
        </div>
      ) : (
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
      )}

      {isLoading ? (
        <h2 className="loading-text">Loading...</h2>
      ) : error ? (
        <div className="error-message">{error?.data?.message || error.error}</div>
      ) : (
        <>
          <h1 className="page-title">{keyword ? 'Search Results' : 'Latest Products'}</h1>

          <Row className="g-4">
            {data.products
              .filter(product => product.image) // Filter out products without images
              .map((product) => (
                <Col
                  key={product._id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  className="d-flex justify-content-center"
                >
                  <div className="product-card">
                    <Product product={product} />
                  </div>
                </Col>
              ))}
          </Row>

          <div className="pagination-wrapper">
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ''}
            />
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
