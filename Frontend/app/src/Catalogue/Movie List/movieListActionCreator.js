import * as movieListActionTypes from "./movieListActionTypes";
import axios from "../../hoc/axios";
export const fetchMovielist = (data) => {
  return {
    type: movieListActionTypes.FETCH_MOVIES,
    movies: data.results,
    last_page: data.last_page,
  };
};

export const fetchMovieListStart = () => {
  return {
    type: movieListActionTypes.FETCH_MOVIES_START,
  };
};

export const fetchMovieListError = (error) => {
  return {
    type: movieListActionTypes.FETCH_MOVIES_ERROR,
    error: error,
  };
};

export const fetchMovieListSuccess = () => {
  return {
    type: movieListActionTypes.FETCH_MOVIES_SUCCESS,
  };
};

export const getMovieList = (state) => {
  return (dispatch) => {
    dispatch(fetchMovieListStart());
    axios
      .get("/movies/catalogue", {
        params: state,
      })
      .then((response) => {
        dispatch(fetchMovielist(response.data));
      })
      .then(() => {
        dispatch(fetchMovieListSuccess());
      })
      .catch((error) => {
        dispatch(fetchMovieListError(error));
      });
  };
};
