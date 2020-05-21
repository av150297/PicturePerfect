import React, { useEffect } from "react";
import Aux from "../../hoc/auxilory";
import Carousels from "../../Common/Carousels/carousels";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import * as homePageActionCreator from "./homePageActionCreator";
import Card from "./Card/card";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import * as LinkConstants from "../../Common/Constants/linkConstants";
import { Link } from "react-router-dom";
import Style from "./homePageStyle.js";
import Backdrop from "../../Common/Backdrop/backdrop";

const useStyles = makeStyles(Style);

const hompage = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.fetchData();
  }, []);
  let loading = null;
  if (props.loading) {
    loading = <Backdrop />;
  }
  const size = props.movies.length;
  let movieCards = null;
  for (let i = 0; i < 6; i++) {
    if (i < size) {
      movieCards = (
        <Aux>
          {movieCards}
          <Col>
            <Card list={props.movies[i]} />
          </Col>
        </Aux>
      );
    }
  }
  let showCards = null;
  for (let i = 0; i < 6; i++) {
    if (i < size) {
      showCards = (
        <Aux>
          {showCards}
          <Col>
            <Card list={props.shows[i]} />
          </Col>
        </Aux>
      );
    }
  }
  return (
    <Aux>
      <Carousels />
      {loading}
      <Row>
        <Col>
          <Paper elevation={2} className={classes.root}>
            <h3>
              <strong>Popular Movies</strong>
            </h3>
            <Link
              to={{
                pathname: LinkConstants.MOVIE_LIST,
                search: "?page=1",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                endIcon={<ArrowForwardIosIcon fontSize="inherit" />}
              >
                More
              </Button>
            </Link>
          </Paper>
        </Col>
      </Row>
      <Row className={classes.row}>{movieCards}</Row>
      <Row>
        <Col>
          <Paper elevation={2} className={classes.root}>
            <h3>
              <strong>Popular Tv Shows</strong>
            </h3>
            <Link
              to={{
                pathname: LinkConstants.TV_SHOWS,
                search: "?page=1",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                endIcon={<ArrowForwardIosIcon fontSize="inherit" />}
                href="#movielist"
              >
                More
              </Button>
            </Link>
          </Paper>
        </Col>
      </Row>
      <Row className={classes.row}>{showCards}</Row>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.homePage.loading,
    movies: state.homePage.movies,
    shows: state.homePage.shows,
    error: state.homePage.error,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(homePageActionCreator.getData()),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(hompage);
