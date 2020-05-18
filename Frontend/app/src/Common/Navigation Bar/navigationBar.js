import React from "react";
import Aux from "../../hoc/auxilory";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as LinkConstants from "../Constants/linkConstants";

const style = {
  textDecoration: "none",
};

const navigationBar = (props) => {
  return (
    <Aux>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href={LinkConstants.HOME_PAGE}>
          PicturePerfect
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Link
            to={{
              pathname: LinkConstants.MOVIE_LIST,
              search: "?page=1",
            }}
            style={style}
          >
            <Nav.Link href="#movieList">Movies</Nav.Link>
          </Link>
          <Link to={LinkConstants.MOVIE_SHOWS} style={style}>
            <Nav.Link href="#shows">Shows</Nav.Link>
          </Link>
        </Nav>
        <Nav>
          <Link to={LinkConstants.ABOUT_US} style={style}>
            <Nav.Link href="#aboutus">About Us</Nav.Link>
          </Link>
          <Link to={LinkConstants.LOGIN}>
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
