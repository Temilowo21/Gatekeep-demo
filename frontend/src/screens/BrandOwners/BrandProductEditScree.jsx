import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { 
  useGetProductDetailsQuery, 
  useUpdateProductMutation, 
  useUploadProductImageMutation 
} from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";

const BrandProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || 0);
      setImage(product.image || ''); // ✅ FIXED
      setBrand(product.brand || '');
      setCategory(product.category || '');
      setCountInStock(product.countInStock || 0);
      setDescription(product.description || '');
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        _id: productId,
        name,
        price,
        image: image, // ✅ No Array, single string
        brand,
        category,
        countInStock,
        description,
      }).unwrap();
      navigate("/brand/myproducts");
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      console.log('Image uploaded:', res);
      setImage(res.image); // ✅ Save uploaded image path
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormContainer>
      <h1>Edit Product</h1>

      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="price" className="my-2">
            <Form.Label>Price (£)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group controlId="image" className="my-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL or upload file"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.Control
              type="file"
              onChange={uploadFileHandler}
              className="mt-2"
            />
            {loadingUpload && <Loader />}

            {/* ✅ Image preview */}
            {image && (
              <div className="mt-2">
                <img
                  src={`http://localhost:5000${image}`}
                  alt="Uploaded preview"
                  style={{ maxWidth: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                />
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="brand" className="my-2">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand name"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="countInStock" className="my-2">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter stock quantity"
              value={countInStock}
              onChange={(e) => setCountInStock(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group controlId="category" className="my-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="description" className="my-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default BrandProductEditScreen;
