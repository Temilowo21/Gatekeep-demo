import React from 'react';
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart); // ✅ get cart items

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Calculate cart quantity
  const cartCount = cartItems ? cartItems.reduce((acc, item) => acc + item.qty, 0) : 0;

  return (
    <header>
      {/* Inline CSS for full-width Header */}
      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 1000;
          background-color: #101010 !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          min-height: 60px;
          padding: 0 20px;
        }

        .navbar-brand {
          font-weight: bold;
          font-size: 24px;
          color: #ffffff !important;
          margin-right: 30px;
          text-decoration: none;
        }

        .navbar-nav {
          align-items: center;
          gap: 10px;
        }

        .search-box {
          display: flex;
          align-items: center;
        }

        .search-box input {
          border-radius: 30px;
          padding: 6px 15px;
          width: 250px;
          max-width: 300px;
          border: none;
          outline: none;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .search-box input:focus {
          box-shadow: 0 0 5pxrgb(74, 76, 74);
        }

        .search-box button {
          border-radius: 30px;
          margin-left: 8px;
          background-color:rgb(67, 73, 67);
          color: white;
          border: none;
          padding: 6px 18px;
          font-size: 14px;
        }

        .nav-link, .dropdown-toggle {
          color: #ffffff !important;
          font-size: 15px;
          padding: 6px 12px;
        }

        .dropdown-menu {
          background-color: #212121;
          margin-top: 10px;
          border-radius: 10px;
        }

        .dropdown-item {
          color: #ffffff;
          padding: 8px 16px;
        }

        .dropdown-item:hover {
          background-color: #333333;
        }

        .cart-badge {
          background-color: #4CAF50;
          margin-left: 5px;
          font-size: 12px;
          padding: 3px 8px;
          border-radius: 12px;
        }

        /* Smaller toggle button */
        .navbar-toggler {
          padding: 2px 8px;
          font-size: 18px;
        }
      `}</style>

      <Navbar expand="lg" variant="dark" collapseOnSelect>
        <Navbar.Brand as={Link} to="/">GateKeep</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="search-box">
              <SearchBox />
            </div>
          </Nav>

          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/cart">
              <i className="fas fa-shopping-cart"></i> Cart
              {cartCount > 0 && (
                <Badge pill bg="success" className="cart-badge">
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {userInfo && userInfo.isBrand && (
              <NavDropdown title="Brand Panel" id="brandmenu">
                <NavDropdown.Item as={Link} to="/brand/myproducts">My Products</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/brand/createproduct">Create Product</NavDropdown.Item>
              </NavDropdown>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown 
                title={
                  <>
                    <i className="fas fa-cogs"></i> Admin Panel
                  </>
                }
                id="adminmenu"
              >
                <NavDropdown.Item as={Link} to="/admin/userList">
                  Users
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/productList">
                  Products
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/orderList">
                  Orders
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {userInfo ? (
              <NavDropdown 
                title={
                  <>
                    <i className="fas fa-user"></i> {userInfo.name}
                  </>
                }
                id="usermenu"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">
                <i className="fas fa-user"></i> Sign In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
