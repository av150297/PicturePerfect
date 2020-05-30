import * as homePageActionTypes from "./homePageActionTypes";

//Initial State for movie list component
const initialState = {
  loading: true,
  movies: [],
  shows: [],
  error: null,
};

const homePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case homePageActionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        movies: action.movies,
        shows: action.shows,
        loading: false,
        error: null,
      };
    case homePageActionTypes.FETCH_DATA_START:
      return {
        ...state,
        loading: true,
      };
    case homePageActionTypes.FETCH_DATA_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};

export default homePageReducer;
