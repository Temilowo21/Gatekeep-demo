import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ProductListScreen = () => {
  const { pageNumber = 1 } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        refetch();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        const res = await createProduct().unwrap();
        console.log("Created product:", res);
        refetch();
      } catch (error) {
        console.error("Error creating product:", error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error || "Something went wrong"}
        </Message>
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
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>£{product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm me-2">
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

          {data.pages > 1 && (
            <div className="d-flex justify-content-center">
              {[...Array(data.pages).keys()].map((x) => (
                <Link
                  key={x + 1}
                  to={`/admin/productList/page/${x + 1}`}
                  className={`btn mx-1 ${x + 1 === Number(pageNumber) ? 'btn-primary' : 'btn-light'}`}
                >
                  {x + 1}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
