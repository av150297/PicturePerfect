import * as movieActionTypes from "./movieActionTypes";
import axios from "../../../hoc/axios";

export const fetchMovieSuccess = (data) => {
  return {
    type: movieActionTypes.FETCH_MOVIE_SUCCESS,
    data: data,
  };
};

export const fetchMovieStart = () => {
  return {
    type: movieActionTypes.FETCH_MOVIE_START,
  };
};

export const fetchMovieError = (error) => {
  return {
    type: movieActionTypes.FETCH_MOVIE_ERROR,
    error: error,
  };
};

export const getMovie = (movieId) => {
  return (dispatch) => {
    dispatch(fetchMovieStart());
    axios
      .get("/movies/catalogue/" + movieId)
      .then((response) => {
        dispatch(fetchMovieSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMovieError(error));
      });
  };
};
