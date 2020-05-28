import React, { Component } from "react";
import classes from "./App.css";
import { Switch, Route } from "react-router-dom";
import Aux from "./hoc/auxilory";
import MovieList from "./Catalogue/Movie List/movieList";
import TvshowList from "./Catalogue/Movie List/tvshowList";
import HomePage from "./Catalogue/Home Page/homePage";
import NavigationBar from "./Common/Navigation Bar/navigationBar";
import { MuiThemeProvider } from "@material-ui/core/styles";
import queryString from "query-string";
import Footer from "./Common/Footer/footer";
import ErrorAlerts from "./Common/Alert/error";
import * as errors from "./Common/Constants/errorConstants";
import * as LinkConstants from "./Common/Constants/linkConstants";
import MovieInfo from "./Catalogue/Movie Info/movieInfo";

//Main Routing Class
class App extends Component {
  render() {
    return (
      <Aux>
        <MuiThemeProvider>
          <NavigationBar />
          <div className={classes.main}>
            <div>
              <Switch>
                <Route
                  path={LinkConstants.HOME_PAGE}
                  exact
                  component={HomePage}
                />
                <Route
                  path={LinkConstants.MOVIE_LIST}
                  exact
                  render={(props) => {
                    let params = queryString.parse(props.location.search);
                    if (params.page && isNaN(params.page)) {
                      return (
                        <ErrorAlerts>{errors.INVALID_PAGE_ERROR}</ErrorAlerts>
                      );
                    } else if (
                      params.page &&
                      (params.page > errors.THRESHOLD || params.page < 1)
                    ) {
                      return (
                        <ErrorAlerts>{errors.PAGE_COUNT_ERROR}</ErrorAlerts>
                      );
                    } else {
                      return <MovieList parameters={params} type="movies" />;
                    }
                  }}
                />
                <Route
                  path={LinkConstants.MOVIE_DESCRIPTION}
                  exact
                  render={(props) => {
                    const movieId = props.match.params.movieid;
                    if (movieId && (isNaN(movieId) || movieId < 1)) {
                      return (
                        <ErrorAlerts>{errors.INVALID_MOVIE_ID}</ErrorAlerts>
                      );
                    }
                    return <MovieInfo movieId={movieId} />;
                  }}
                />
                <Route
                  path={LinkConstants.TV_SHOWS}
                  exact
                  render={(props) => {
                    let params = queryString.parse(props.location.search);
                    if (params.page && isNaN(params.page)) {
                      return (
                        <ErrorAlerts>{errors.INVALID_PAGE_ERROR}</ErrorAlerts>
                      );
                    } else if (
                      params.page &&
                      (params.page > errors.THRESHOLD || params.page < 1)
                    ) {
                      return (
                        <ErrorAlerts>{errors.PAGE_COUNT_ERROR}</ErrorAlerts>
                      );
                    } else {
                      return <TvshowList parameters={params} type="tvshows" />;
                    }
                  }}
                />
                <Route
                  path={LinkConstants.TVSHOW_DESCRIPTION}
                  exact
                  render={() => {
                    return <h1>Yet to be implemented</h1>;
                  }}
                />
                <Route
                  path={LinkConstants.LOGIN}
                  exact
                  render={() => {
                    return <h1>Yet to be implemented</h1>;
                  }}
                />
                <Route
                  path={LinkConstants.ABOUT_US}
                  exact
                  render={() => {
                    return <h1>Yet to be implemented</h1>;
                  }}
                />
                <Route
                  render={() => {
                    return <h1>Invalid request</h1>;
                  }}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </MuiThemeProvider>
      </Aux>
    );
  }
}

export default App;
