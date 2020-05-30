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
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Backdrop from "../../../Common/Backdrop/backdrop";
import Reviews from "../../Reviews/reviews";
import ErrorAlert from "../../../Common/Alert/error";

const movie = (props) => {
  useEffect(() => {
    props.fetchMovie(props.movieId);
  }, [props.movieId]);

  if (props.loading) {
    return <Backdrop />;
  } else if (props.error) {
    return <ErrorAlert>Oops! Something Went Wrong</ErrorAlert>;
  } else {
    const [year, month, day] = props.data.release_date.split("-");
    const hours = Math.floor(props.data.runtime / 60);
    const minutes = props.data.runtime % 60;
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
            <Card className={classes.root}>
              <CardActionArea className={classes.cardcontent}>
                <Image
                  src={IMAGE_BASE_URL + props.data.poster_path}
                  alt="poster"
                  className={classes.media}
                />
              </CardActionArea>
            </Card>
          </Col>
          <Col className={classes.content_card}>
            <h1 className={classes.title}>
              <strong>{props.data.title}</strong> ({year})
            </h1>

            <h6 className={classes.release_date}>
              {day}/{month}/{year} &middot; {hours}h {minutes}m
            </h6>

            <Rating value={props.data.vote_average / 2.0}></Rating>

            <Popularity value={props.data.vote_average}></Popularity>

            <h5 className={classes.tagline}>
              <i>{props.data.tagline}</i>
            </h5>

            <h4 className={classes.overview}>Overview</h4>

            <h6 className={classes.description}>{props.data.overview}</h6>
          </Col>
        </div>
        <Reviews typeId={props.movieId} type="movie" />
      </Aux>
    );
  }
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
