import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId, {});
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setImage(product.image);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.file); // ✅ server should return { file: '/uploads/yourimage.jpg' }
    } catch (err) {
      console.error('Error uploading file', err);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        _id: productId,
        name,
        price,
        brand,
        category,
        countInStock,
        description,
        image,
      }).unwrap();
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      console.error('Failed to update product', err);
    }
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>

        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='price' className='my-2'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='image' className='my-2'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                type='file'
                onChange={uploadFileHandler}
                className='my-2'
              />
              {loadingUpload && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand' className='my-2'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='category' className='my-2'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='countInStock' className='my-2'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='description' className='my-2'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
