import * as reviewsActionTypes from "./reviewsActionTypes";
import axios from "../../hoc/axios";
import * as linkConstants from "../../Common/Constants/linkConstants";

export const fetchReviewsSuccess = (data) => {
  return {
    type: reviewsActionTypes.FETCH_REVIEWS_SUCCESS,
    data: data.results,
  };
};

export const fetchReviewsStart = () => {
  return {
    type: reviewsActionTypes.FETCH_REVIEWS_START,
  };
};

export const fetchReviewsError = (error) => {
  return {
    type: reviewsActionTypes.FETCH_REVIEWS_ERROR,
    error: error,
  };
};

export const getReviews = (typeId, type) => {
  return (dispatch) => {
    dispatch(fetchReviewsStart());
    axios
      .get(linkConstants.REVIEWS + typeId, {
        params: { type: type },
      })
      .then((response) => {
        dispatch(fetchReviewsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchReviewsError(error));
      });
  };
};
