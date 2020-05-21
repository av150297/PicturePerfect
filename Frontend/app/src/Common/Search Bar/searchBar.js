import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Aux from "../../hoc/auxilory";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Style from "./searchBarStyle";
import * as LinkConstants from "../Constants/linkConstants";
import * as Handlers from "../../Catalogue/Movie List/movieListHandler";
const style = Style;

const searchBar = (props) => {
  const [searchBarState, setSearchBarState] = useState(""); //Default state for search bar
  let clearSearchButton = null;
  if (props.state.search !== "") {
    clearSearchButton = (
      <Link
        to={{
          pathname:
            props.type === "movies"
              ? LinkConstants.MOVIE_LIST
              : LinkConstants.TV_SHOWS,
          search: "?page=1",
        }}
      >
        <IconButton
          onClick={() =>
            Handlers.clearSearchHandler(
              props.state,
              props.setState,
              setSearchBarState
            )
          }
          style={{ outline: "none" }}
        >
          <ClearIcon fontSize="medium" />
        </IconButton>
      </Link>
    );
  }
  const paramHandler = (params) => {
    const p = new URLSearchParams(params);
    return "?" + p.toString();
  };

  return (
    <Aux>
      <TextField
        id="search_bar"
        label="Search"
        value={searchBarState}
        style={{ margin: 10, width: "53%" }}
        placeholder={
          props.type === "movies"
            ? "Search your movies here"
            : "Search your shows here"
        }
        margin="normal"
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">{clearSearchButton}</InputAdornment>
          ),
          shrink: true,
        }}
        variant="outlined"
        onChange={(event) => Handlers.onChangeHandler(setSearchBarState, event)}
      />

      <Link
        to={{
          pathname:
            props.type === "movies"
              ? LinkConstants.MOVIE_LIST
              : LinkConstants.TV_SHOWS,
          search:
            searchBarState !== ""
              ? paramHandler({ search: searchBarState, page: 1 })
              : paramHandler({ page: props.page }),
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={style.button}
        >
          Search
        </Button>
      </Link>
    </Aux>
  );
};
export default searchBar;
