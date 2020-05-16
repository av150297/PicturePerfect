import React from "react";
import Aux from "../../hoc/auxilory";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const style = {
  textDecoration: "none",
};

const navigationBar = (props) => {
  return (
    <Aux>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/">PicturePerfect</Navbar.Brand>
        <Nav className="mr-auto">
          <Link
            to={{
              pathname: "/movies/catalogue",
              search: "?page=1",
            }}
            style={style}
          >
            <Nav.Link href="#movieList">Movies</Nav.Link>
          </Link>
          <Link to="/movies/shows" style={style}>
            <Nav.Link href="#shows">Shows</Nav.Link>
          </Link>
        </Nav>
        <Nav>
          <Link to="/aboutus" style={style}>
            <Nav.Link href="#aboutus">About Us</Nav.Link>
          </Link>
          <Link to="/login">
            <Button href="#login" variant="outline-info">
              Login
            </Button>
          </Link>
        </Nav>
      </Navbar>
    </Aux>
  );
};
export default navigationBar;
