import React from "react";
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store.js';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import App from './App.js';
import AdminRoute from './components/AdminRoute.jsx';
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import reportWebVitals from './reportWebVitals';

import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingScreen from "./screens/shippingScreen.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import OrderListScreen from "./screens/Admin/OrderListScreen.jsx";
import ProductListScreen from "./screens/Admin/ProductListScreen.jsx";
import ProductEditScreen from "./screens/Admin/ProductEditScreen.jsx";
import UserListScreen from "./screens/Admin/UserListScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomeScreen />} />
      <Route path="product/:id" element={<ProductScreen />} />
      <Route path="cart" element={<CartScreen />} />
      <Route path="login" element={<LoginScreen />} />
      <Route path="register" element={<RegisterScreen />} />

      <Route element={<PrivateRoutes />}>
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="shipping" element={<ShippingScreen />} />
        <Route path="payment" element={<PaymentScreen />} />
        <Route path="placeorder" element={<PlaceOrderScreen />} />
        <Route path="order/:id" element={<OrderScreen />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="admin/orderList" element={<OrderListScreen />} />
        <Route path="admin/productList" element={<ProductListScreen />} />
        <Route path="admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="admin/userList" element={<UserListScreen />} />
        
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider options={{ 'client-id': 'test' }} deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
