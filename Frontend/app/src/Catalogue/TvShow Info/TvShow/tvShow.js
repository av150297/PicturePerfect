import React, { useEffect } from "react";
import Aux from "../../../hoc/auxilory";
import { connect } from "react-redux";
import * as tvShowActionCreator from "./tvShowActionCreator";
import classes from "./tvShow.css";
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

const tvShow = (props) => {
  useEffect(() => {
    props.fetchTvShow(props.showId);
  }, [props.showId]);
  if (props.loading) {
    return <Backdrop />;
  } else if (props.loading) {
    return <ErrorAlert>Oops ! Something went wrong</ErrorAlert>;
  } else {
    const [year, month, day] = props.data.first_air_date.split("-");
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
              <strong>{props.data.name}</strong> ({year})
            </h1>

            <h6 className={classes.release_date}>
              {day}/{month}/{year}
            </h6>

            <Rating value={props.data.vote_average / 2.0}></Rating>

            <Popularity value={props.data.vote_average}></Popularity>

            <h5 className={classes.tagline}>
              <strong>{props.data.number_of_seasons} </strong> Season
              {props.data.number_of_seasons > 1 ? "s " : " "}
              <strong>{props.data.number_of_episodes} </strong> Episodes{" "}
            </h5>

            <h4 className={classes.overview}>Overview</h4>

            <h6 className={classes.description}>{props.data.overview}</h6>
          </Col>
        </div>
        <Reviews typeId={props.showId} type="tvshow" />
      </Aux>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    loading: state.tvShow.loading,
    data: state.tvShow.data,
    error: state.tvShow.error,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchTvShow: (showId) => dispatch(tvShowActionCreator.getTvShow(showId)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(tvShow);
