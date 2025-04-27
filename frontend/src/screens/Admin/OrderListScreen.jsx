import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice'; // ✅ Fixed path
import Loader from '../../components/Loader'; // ✅ Fixed path
import Message from '../../components/Message'; // ✅ Fixed path

const OrderListScreen = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  const orders = data?.orders || [];

  return (
    <>
      <h1>Orders</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error || 'Failed to fetch orders'}
        </Message>
      ) : !Array.isArray(orders) ? (
        <Message variant='danger'>Invalid order data received</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user ? order.user.name : 'Deleted User'}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>£{order.totalPrice.toFixed(2)}</td>
                <td className='text-center'>{order.isPaid ? '✅' : '❌'}</td>
                <td className='text-center'>{order.isDelivered ? '✅' : '❌'}</td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
