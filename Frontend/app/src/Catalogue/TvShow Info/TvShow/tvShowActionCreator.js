import * as tvShowActionTypes from "./tvShowActionTypes";
import axios from "../../../hoc/axios";
import * as linkConstants from "../../../Common/Constants/linkConstants";

export const fetchTvShowSuccess = (data) => {
  return {
    type: tvShowActionTypes.FETCH_TVSHOW_SUCCESS,
    data: data,
  };
};

export const fetchTvShowStart = () => {
  return {
    type: tvShowActionTypes.FETCH_TVSHOW_START,
  };
};

export const fetchTvShowError = (error) => {
  return {
    type: tvShowActionTypes.FETCH_TVSHOW_ERROR,
    error: error,
  };
};

export const getTvShow = (showId) => {
  return (dispatch) => {
    dispatch(fetchTvShowStart());
    axios
      .get(linkConstants.TVSHOWS + showId)
      .then((response) => {
        dispatch(fetchTvShowSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchTvShowError(error));
      });
  };
};
