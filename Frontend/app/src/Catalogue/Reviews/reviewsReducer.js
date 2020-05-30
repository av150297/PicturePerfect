import * as reviewsActionTypes from "./reviewsActionTypes";

//Initial State for movie list component
const initialState = {
  loading: false,
  data: [],
  error: null,
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case reviewsActionTypes.FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        laoding: false,
      };
    case reviewsActionTypes.FETCH_REVIEWS_START:
      return {
        ...state,
        loading: true,
      };
    case reviewsActionTypes.FETCH_REVIEWS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};

export default reviewsReducer;
