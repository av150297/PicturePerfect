import React, { useEffect } from "react";
import Aux from "../../../hoc/auxilory";
import { connect } from "react-redux";
import * as movieActionCreator from "./movieActionCreator";
import classes from "./movie.css";
import Rating from "../../../Common/Rating/rating";
import Popularity from "../../../Common/Popularity/popularity";
import { Col } from "react-bootstrap";
import { IMAGE_BASE_URL } from "../../../Common/Constants/URLConstants";
import Image from "react-bootstrap/Image";

const movie = (props) => {
  useEffect(() => {
    props.fetchMovie(props.movieId);
  }, [props.movieId]);
  let year = null,
    month = null,
    day = null;
  if (props.data.release_date) {
    [year, month, day] = props.data.release_date.split("-");
  }
  var hours = 0,
    minutes = 0;
  if (props.data.runtime) {
    hours = Math.floor(props.data.runtime / 60);
    minutes = props.data.runtime % 60;
  }
  console.log("Movie Called: ", props.data.title);
  return (
    <Aux>
      <div
        className={classes.row}
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(https://image.tmdb.org/t/p/w1280/" +
            props.data.backdrop_path +
            ")",
        }}
      >
        <Col xs={4} className={classes.image_card}>
          <Image
            src={IMAGE_BASE_URL + props.data.poster_path}
            alt="poster"
            className={classes.image}
          />
        </Col>
        <Col className={classes.content_card}>
          <h1 className={classes.title}>
            <strong>{props.data.title}</strong> ({year})
          </h1>
          <h6 className={classes.release_date}>
            {day}/{month}/{year} &middot; {hours}h {minutes}m
          </h6>
          {props.data.vote_average ? (
            <Rating value={props.data.vote_average / 2.0}></Rating>
          ) : null}
          {props.data.vote_average ? (
            <Popularity value={props.data.vote_average}></Popularity>
          ) : null}
          <h5 className={classes.tagline}>
            <i>{props.data.tagline}</i>
          </h5>
          <h4 className={classes.overview}>Overview</h4>
          <h6 className={classes.description}>{props.data.overview}</h6>
        </Col>
      </div>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.movie.loading,
    data: state.movie.data,
    error: state.movie.error,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchMovie: (movieId) => dispatch(movieActionCreator.getMovie(movieId)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(movie);
