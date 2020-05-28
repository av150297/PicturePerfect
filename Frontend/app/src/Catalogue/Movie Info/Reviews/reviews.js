import React, { useState, useEffect } from "react";
import Aux from "../../../hoc/auxilory";
import { connect } from "react-redux";
import Review from "./Review/review";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import * as reviewsActionCreator from "./reviewsActionCreator";
import Style from "./reviewsStyle";
import { Typography } from "@material-ui/core";
import PostReview from "./Post Review/postReview";

const useStyles = makeStyles(Style);

const reviews = (props) => {
  const classes = useStyles();
  const [state, setState] = useState(0);
  useEffect(() => {
    props.fetchReviews(props.movieId);
  }, [state]);
  console.log("Reviews Called: ", props.data);
  return (
    <Aux>
      <Paper elevation={2} className={classes.root}>
        <Typography className={classes.heading}>User Reviews</Typography>
      </Paper>
      {props.data.map((item) => {
        return <Review data={item} />;
      })}
      <Paper elevation={2} className={classes.root}>
        <Typography className={classes.heading}>Write your review </Typography>
      </Paper>
      <PostReview movieId={props.movieId} state={state} setState={setState} />
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.reviews.loading,
    data: state.reviews.data,
    error: state.reviews.error,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchReviews: (movieId) =>
      dispatch(reviewsActionCreator.getReviews(movieId)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(reviews);
