import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order,
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ORDERS_URL,
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...orderData }) => ({
        url: `${ORDERS_URL}/${id}`,
        method: 'PUT',
        body: orderData,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/paypal/clientId`,
      }),
      keepUnusedDataFor: 5,
    }),
  getMyOrders: builder.query({
    query: () => ({
      url: `${ORDERS_URL}/myorders`,
    }),
    keepUnusedDataFor: 5,
  }),
  deliverOrder: builder.mutation({
    query: (id) => ({
      url: `${ORDERS_URL}/${id}/deliver`,
      method: 'PUT',
    }),
  }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useDeliverOrderMutation
} = ordersApiSlice;
