import * as homePageActionTypes from "./homePageActionTypes";
import axios from "../../hoc/axios";

export const fetchDataSuccess = (data) => {
  return {
    type: homePageActionTypes.FETCH_DATA_SUCCESS,
    movies: data.movies,
    shows: data.shows,
    last_page: data.last_page,
  };
};

export const fetchDataStart = () => {
  return {
    type: homePageActionTypes.FETCH_DATA_START,
  };
};

export const fetchDataError = (error) => {
  return {
    type: homePageActionTypes.FETCH_DATA_ERROR,
    error: error,
  };
};

export const getData = () => {
  return (dispatch) => {
    dispatch(fetchDataStart());
    axios
      .get("/")
      .then((response) => {
        dispatch(fetchDataSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchDataError(error));
      });
  };
};
