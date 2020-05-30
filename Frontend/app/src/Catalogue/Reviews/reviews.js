import React, { useState, useEffect } from "react";
import Aux from "../../hoc/auxilory";
import { connect } from "react-redux";
import Review from "./Review/review";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import * as reviewsActionCreator from "./reviewsActionCreator";
import Style from "./reviewsStyle";
import { Typography } from "@material-ui/core";
import PostReview from "./Post Review/postReview";
import SnackBar from "../../Common/Snackbar/snackbar";
import ErrorAlert from "../../Common/Alert/error";

const useStyles = makeStyles(Style);

const reviews = (props) => {
  const classes = useStyles();
  const [state, setState] = useState(0);
  const [snackBarState, setSnackBarState] = useState(0);
  useEffect(() => {
    props.fetchReviews(props.typeId, props.type);
  }, [state]);
  if (props.error) {
    return <ErrorAlert>Problem Loading Reviews</ErrorAlert>;
  }
  return (
    <Aux>
      <Paper elevation={2} className={classes.root}>
        <Typography className={classes.heading}>User Reviews</Typography>
      </Paper>
      {props.data.map((item) => {
        return <Review key={item.id} data={item} />;
      })}
      <Paper elevation={2} className={classes.root}>
        <Typography className={classes.heading}>Write your review </Typography>
      </Paper>
      <PostReview
        typeId={props.typeId}
        type={props.type}
        state={state}
        setState={setState}
        setSnackBarState={setSnackBarState}
      />
      <SnackBar
        snackBarState={snackBarState}
        setSnackBarState={setSnackBarState}
      />
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
    fetchReviews: (typeId, type) =>
      dispatch(reviewsActionCreator.getReviews(typeId, type)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(reviews);
