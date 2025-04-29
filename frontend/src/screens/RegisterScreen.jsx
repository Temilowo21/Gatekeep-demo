import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isBrand, setIsBrand] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirectParam = sp.get('redirect');
  
  const redirect = redirectParam && redirectParam.trim() !== ''
    ? `/${redirectParam.replace(/^\/+/, '')}`
    : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password, isBrand }).unwrap();  // ✅ Corrected here
        dispatch(setCredentials(res));
        navigate(redirect);
      } catch (error) {
        setMessage(error?.data?.message || 'Invalid email or password');
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && (
        <div className="alert alert-danger">{message}</div>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="my-2">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="my-2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="isBrand" className="my-3">
          <Form.Check 
            type="checkbox" 
            label="Register as a Brand?"
            checked={isBrand}
            onChange={(e) => setIsBrand(e.target.checked)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3" disabled={isLoading}>
          Sign Up
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
