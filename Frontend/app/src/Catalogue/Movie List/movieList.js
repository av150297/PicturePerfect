import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as movieListActionCreator from "./movieListActionCreator";
import Aux from "../../hoc/auxilory";
import MovieCards from "./Movie Card/movieCards";
import SearchBar from "../../Common/Search Bar/searchBar";
import * as Handler from "./movieListHandler";
import { Row, Col } from "react-bootstrap";
import Select from "./movieListSelect";
import Typography from "@material-ui/core/Typography";
import Pagination from "../../Common/Paginate/paginate";
import Backdrop from "../../Common/Backdrop/backdrop";
import { filterParameters } from "./movieListHelper";
import classes from "./movieList.css";
import ErrorAlerts from "../../Common/Alert/error";

//MovieList Component to display the list of movies
const movieList = (props) => {
  const params = filterParameters(props.parameters); //filter the parameters paased in the url
  const [state, setState] = useState({
    page: params.page,
    sort: 1,
    search: params.search,
    attribute: "release_date",
  }); //Default State for the component
  useEffect(() => {
    props.fetchMovies(state, props.type);
  }, [state, props.type]);
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
  let error_message = null;
  if (props.error) {
    error_message = <ErrorAlerts>Something went wrong !</ErrorAlerts>;
  }

  return (
    <Aux>
      <div className={classes.main}>
        <Row>
          <Col>
            <SearchBar
              page={state.page}
              type="movies"
              state={state}
              setState={setState}
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
              sortHandler={(event) =>
                Handler.sortHandler(state, setState, event)
              }
              type={props.type}
            />
          </Col>
        </Row>
        <Row>
          <Col>{searchTitle}</Col>
        </Row>
        {error_message}
        <MovieCards data={props.data} type={props.type} />

        <Row>
          <Col>
            <Pagination
              page={state.page}
              pageCount={props.last_page}
              search={state.search}
              type="movies"
            />
          </Col>
        </Row>
      </div>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.movieList.loading,
    data: state.movieList.data,
    last_page: state.movieList.last_page,
    error: state.movieList.error,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchMovies: (state, type) =>
      dispatch(movieListActionCreator.getMovieList(state, type)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(movieList);
