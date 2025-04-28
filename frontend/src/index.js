import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import App from "./App.js";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import reportWebVitals from "./reportWebVitals";

// Screens
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingScreen from "./screens/shippingScreen.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";

// Admin Screens
import OrderListScreen from "./screens/Admin/OrderListScreen.jsx";
import ProductListScreen from "./screens/Admin/ProductListScreen.jsx";
import ProductEditScreen from "./screens/Admin/ProductEditScreen.jsx";
import UserListScreen from "./screens/Admin/UserListScreen.jsx";

// Brand Owner Screens
import BrandProductListScreen from "./screens/BrandOwners/BrandProductListScreen.jsx";
import BrandProductEditScreen from "./screens/BrandOwners/BrandProductEditScree.jsx";

// Router Setup
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      {/* Protected User Routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/userList" element={<UserListScreen />} />
        <Route path="/admin/productList" element={<ProductListScreen />} />
        <Route path="/admin/productList/page/:pageNumber" element={<ProductListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/orderList" element={<OrderListScreen />} />
      </Route>

      {/* Brand Owner Routes */}
      <Route path="/brand/myproducts" element={<BrandProductListScreen />} />
      <Route path="/brand/product/:id/edit" element={<BrandProductEditScreen />} />

    </Route>
  )
);

// Render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider options={{ "client-id": "test" }} deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
