import React from "react";
import { Row, Col } from "react-bootstrap";
import classes from "./footer.css";
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Pinterest,
} from "@material-ui/icons";
const footer = (props) => {
  return (
    <Row className={classes.footer}>
      <Col className={classes.text}>
        Follow us on:
        <Facebook fontSize="large" className={classes.facebook} />
        <Instagram fontSize="large" className={classes.instagram} />
        <LinkedIn fontSize="large" className={classes.linkedin} />
        <Twitter fontSize="large" className={classes.twitter} />
        <Pinterest fontSize="large" className={classes.pinterest} />
      </Col>
    </Row>
  );
};

export default footer;
