import React from "react";
import { Row, Col } from "react-bootstrap";
import classes from "./footer.css";
const footer = (props) => {
  return (
    <Row className={classes.footer}>
      <Col> Content</Col>
    </Row>
  );
};

export default footer;
