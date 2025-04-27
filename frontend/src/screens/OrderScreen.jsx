import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  useGetOrderByIdQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderByIdQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const { data: paypalConfig, isLoading: loadingPayPal } = useGetPayPalClientIdQuery();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { userInfo } = useSelector((state) => state.auth);
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  useEffect(() => {
    if (paypalConfig?.clientId && order && userInfo && userInfo._id === order.user._id) {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': paypalConfig.clientId,
          currency: 'GBP',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    }
  }, [paypalConfig, order, userInfo, paypalDispatch]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ],
    }).then((orderId) => orderId);
  };

  const onApprove = async (data, actions) => {
    const details = await actions.order.capture();
    await payOrder({ orderId, details }).unwrap();
    refetch();
  };

  const onError = (err) => {
    console.error(err);
    alert('Payment failed');
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      alert('Order delivered successfully');
    } catch (err) {
      alert(err?.data?.message || err?.error || 'Failed to mark as delivered');
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">
      {error?.data?.message || error?.error || 'Something went wrong'}
    </Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name:</strong> {order.user.name}</p>
              <p><strong>Email:</strong> {order.user.email}</p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {!order.isDelivered ? (
                <Message variant="danger">Not Delivered</Message>
              ) : (
                <Message variant="success">Delivered on {order.deliveredAt}</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p><strong>Method:</strong> {order.paymentMethod}</p>
              {!order.isPaid ? (
                <Message variant="danger">Not Paid</Message>
              ) : (
                <Message variant="success">Paid on {order.paidAt}</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="align-items-center">
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x £{item.price} = £{(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Items</Col><Col>£{order.itemsPrice.toFixed(2)}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Shipping</Col><Col>£{order.shippingPrice.toFixed(2)}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Tax</Col><Col>£{order.taxPrice.toFixed(2)}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Total</Col><Col>£{order.totalPrice.toFixed(2)}</Col></Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {loadingPayPal ? (
                    <Loader />
                  ) : (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}

              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverOrderHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
