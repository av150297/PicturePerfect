import React from "react";
import TextField from "@material-ui/core/TextField";
//import Grid from "@material-ui/core/Grid";
import Aux from "../../hoc/auxilory";
//import Search from "@material-ui/icons/Search";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
const style = {
  button: {
    marginTop: "10px",
    marginRight: "5px",
    paddingTop: "13px",
    paddingBottom: "13px",
    outline: "none",
    width: "7.5%",
    minWidth: 80,
  },
};

const searchBar = (props) => {
  let clearSearchButton = null;
  if (props.search !== "") {
    clearSearchButton = (
      <Link
        to={{
          pathname: "/movies/catalogue",
          search: "?page=1",
        }}
      >
        <IconButton
          onClick={props.clearSearchHandler}
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
        label="search"
        value={props.value}
        style={{ margin: 8, width: "53%" }}
        placeholder="Search your movies here"
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
        onChange={props.onChangeHandler}
      />

      <Link
        to={{
          pathname: "/movies/catalogue",
          search:
            props.searchBarState !== ""
              ? paramHandler({ search: props.searchBarState, page: 1 })
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
