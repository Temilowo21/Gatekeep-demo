import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useGetMyProductsQuery, useCreateProductMutation, useDeleteProductMutation } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const BrandProductListScreen = () => {
  const { pageNumber = 1 } = useParams();
  const navigate = useNavigate();

  const { data: products, isLoading, error, refetch } = useGetMyProductsQuery({ pageNumber });
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Create a new blank product?')) {
      try {
        await createProduct().unwrap(); // ❌ no navigate, just create it
        refetch(); // ✅ Refresh the list to show new sample
      } catch (err) {
        console.error('Create product failed:', err);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap();
        refetch();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>My Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>COUNT</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>£{product.price}</td>
                  <td>{product.countInStock}</td>
                  <td className="d-flex justify-content-center gap-2">
                    <Link to={`/brand/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default BrandProductListScreen;
