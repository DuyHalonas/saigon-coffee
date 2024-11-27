import React, { useEffect, useRef } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const AppNavbar = ({ setCartPosition }) => {
  const { cart } = useCart();
  const cartRef = useRef();

  useEffect(() => {
    if (cartRef.current) {
      const rect = cartRef.current.getBoundingClientRect();
      setCartPosition({ x: rect.left, y: rect.top });
    }
  }, [setCartPosition]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          SAIGON COFFEE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/checkout" ref={cartRef}>
              Cart{" "}
              <Badge bg="light" text="dark">
                {cart.length}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
