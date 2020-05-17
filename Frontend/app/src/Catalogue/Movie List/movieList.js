import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as movieListActionCreator from "./movieListActionCreator";
import Aux from "../../hoc/auxilory";
import MovieCard from "./Movie Card/movieCard";
import SearchBar from "../../Common/Search Bar/searchBar";
import * as Handler from "./movieListHandler";
import { Row, Col } from "react-bootstrap";
import Select from "./movieListSelect";
import Typography from "@material-ui/core/Typography";
import Pagination from "../../Common/Paginate/paginate";
import Backdrop from "../../Common/Backdrop/backdrop";
import { filterParameters } from "./movieListHelper";
const movieList = (props) => {
  const params = filterParameters(props.parameters);
  const [state, setState] = useState({
    page: params.page,
    sort: 1,
    search: params.search,
    attribute: "release_date",
  });
  const [searchBarState, setSearchBarState] = useState("");
  useEffect(() => {
    props.fetchMovies(state);
  }, [state]);
  let loading = null;
  if (props.loading) {
    loading = <Backdrop />;
  }
  if (params.search !== state.search || params.page !== state.page) {
    if (params.search !== state.search) {
      setState({
        ...state,
        search: params.search,
        page: 1,
      });
    } else {
      setState({
        ...state,
        search: params.search,
        page: params.page,
      });
    }
  }
  let searchTitle = null;
  if (state.search !== "") {
    searchTitle = (
      <Typography variant="h6" gutterBottom style={{ marginLeft: 10 }}>
        Search Result for: <strong>{state.search}</strong>
      </Typography>
    );
  }

  return (
    <Aux>
      <Row>
        <Col>
          <SearchBar
            value={searchBarState}
            onChangeHandler={(event) =>
              Handler.onChangeHandler(setSearchBarState, event)
            }
            submitHandler={() =>
              Handler.submitHandler(searchBarState, state, setState)
            }
            search={state.search}
            searchBarState={searchBarState}
            clearSearchHandler={() =>
              Handler.clearSearchHandler(state, setState, setSearchBarState)
            }
            page={state.page}
          />
        </Col>
      </Row>
      {loading}
      <Row>
        <Col>
          <Select
            attribute={state.attribute}
            attributeHandler={(event) =>
              Handler.attributeHandler(state, setState, event)
            }
            sort={state.sort}
            sortHandler={(event) => Handler.sortHandler(state, setState, event)}
          />
        </Col>
      </Row>
      <Row>
        <Col>{searchTitle}</Col>
      </Row>

      <MovieCard movies={props.movies} />

      <Row>
        <Col>
          <Pagination
            pageChangeHandler={(event, value) =>
              Handler.pageChangeHandler(state, setState, value)
            }
            page={state.page}
            pageCount={props.last_page}
            search={searchBarState}
          />
        </Col>
      </Row>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.movieList.loading,
    movies: state.movieList.movies,
    last_page: state.movieList.last_page,
    error: state.movieList.error,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchMovies: (state) =>
      dispatch(movieListActionCreator.getMovieList(state)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(movieList);
