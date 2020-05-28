import * as movieActionTypes from "./movieActionTypes";

//Initial State for movie list component
const initialState = {
  loading: true,
  data: {},
  error: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case movieActionTypes.FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case movieActionTypes.FETCH_MOVIE_START:
      return {
        ...state,
        loading: true,
      };
    case movieActionTypes.FETCH_MOVIE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};

export default movieReducer;
