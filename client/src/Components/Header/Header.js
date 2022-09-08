import React from "react";
import { BsFillCartDashFill } from "react-icons/bs";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/actions/userAction";

const Header = () => {
  const dispatch = useDispatch();
  const cartReducer = useSelector((state) => state.cartReducer);
  const userReducer = useSelector((state) => state.userReducers);
  const { cartItems } = cartReducer;
  const { user } = userReducer;
  // console.log(userReducer);

  const logoutHandler = (e) => {
    // console.log('hey');
    dispatch(logout());
    // logout
  };

  return (
    <div>
      <Navbar style={{ background: "#001E2B" }} variant="dark" expand="md">
        <Container>
          <NavLink to="/" className="navbar-brand">
            MernShop
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user !== null && user.isAdmin === true ? (
                <>
                  <NavDropdown title="Admin" id="basic-nav-dropdown">
                    <NavLink to={`/admin/user_list`} className="dropdown-item">
                      Users
                    </NavLink>
                    <NavDropdown.Divider />
                    <NavLink
                      to={`/admin/product_list`}
                      className="dropdown-item"
                    >
                      Products
                    </NavLink>
                    <NavDropdown.Divider />
                    <NavLink
                      to={`/admin/orders_list`}
                      className="dropdown-item"
                    >
                      Orders
                    </NavLink>
                  </NavDropdown>
                </>
              ) : null}
              <NavLink to={`/cart`} className="nav-link">
                <div className="cart__icon">
                  <span className="text-xl">
                    <BsFillCartDashFill />
                  </span>
                  <span>{cartItems.length}</span>
                </div>
              </NavLink>
              {user !== null ? (
                <>
                  {" "}
                  <NavLink to={`/profile`} className="nav-link">
                    {user.name}
                  </NavLink>
                  <NavLink to={`/my_orders`} className="nav-link">
                    orders
                  </NavLink>
                  <Link
                    onClick={logoutHandler}
                    to="/login"
                    className="nav-link"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
