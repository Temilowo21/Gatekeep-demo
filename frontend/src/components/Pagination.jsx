import React from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // ✅ use Link

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination className="justify-content-center my-3">
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
          key={x + 1}
          active={x + 1 === Number(page)}
          as={Link}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/productList/${x + 1}`
          }
        >
          {x + 1}
        </Pagination.Item>

        ))}
      </Pagination>
    )
  );
};

export default Paginate;
