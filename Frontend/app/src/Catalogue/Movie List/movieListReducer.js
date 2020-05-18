import * as movieListActionTypes from "./movieListActionTypes";

//Initial State for movie list component
const initialState = {
  loading: true,
  movies: [],
  error: null,
};

const movieListReducer = (state = initialState, action) => {
  switch (action.type) {
    case movieListActionTypes.FETCH_MOVIES:
      return {
        ...state,
        movies: action.movies,
        last_page: action.last_page,
        error: null,
      };
    case movieListActionTypes.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case movieListActionTypes.FETCH_MOVIES_START:
      return {
        ...state,
        loading: true,
      };
    case movieListActionTypes.FETCH_MOVIES_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};

export default movieListReducer;
