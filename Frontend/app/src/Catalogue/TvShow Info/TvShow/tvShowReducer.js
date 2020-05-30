import * as tvShowActionTypes from "./tvShowActionTypes";

//Initial State for movie list component
const initialState = {
  loading: true,
  data: {},
  error: null,
};

const tvShowReducer = (state = initialState, action) => {
  switch (action.type) {
    case tvShowActionTypes.FETCH_TVSHOW_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case tvShowActionTypes.FETCH_TVSHOW_START:
      return {
        ...state,
        loading: true,
      };
    case tvShowActionTypes.FETCH_TVSHOW_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};

export default tvShowReducer;
