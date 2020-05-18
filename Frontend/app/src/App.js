import React, { Component } from "react";
import classes from "./App.css";
import { Switch, Route } from "react-router-dom";
import Aux from "./hoc/auxilory";
import MovieList from "./Catalogue/Movie List/movieList";
import NavigationBar from "./Common/Navigation Bar/navigationBar";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import queryString from "query-string";
import Footer from "./Common/Footer/footer";
import ErrorAlerts from "./Common/Alert/error";
import * as errors from "./Common/Constants/errorConstants";
import * as LinkConstants from "./Common/Constants/linkConstants";
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
                  render={() => {
                    return <h1>Yet to be implemented</h1>;
                  }}
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
                      return <MovieList parameters={params} />;
                    }
                  }}
                />
                <Route
                  path={LinkConstants.MOVIE_DESCRIPTION}
                  exact
                  render={() => {
                    return <h1>Yet to be implemented</h1>;
                  }}
                />
                <Route
                  path={LinkConstants.MOVIE_SHOWS}
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
