//Select button for movie list component
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Style from "./movieListSelectStyle";
const useStyles = makeStyles((theme) => Style(theme));

const selectOption = (props) => {
  const classes = useStyles();
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Attribute
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.attribute}
          onChange={props.attributeHandler}
          label="Attribute"
          className={classes.select}
        >
          <MenuItem value={props.type === "movies" ? "title" : "name"}>
            {props.type === "movies" ? "Title" : "Name"}
          </MenuItem>
          <MenuItem
            value={props.type === "movies" ? "release_date" : "first_air_date"}
          >
            {props.type === "movies" ? "Release Date" : "First Air Date"}
          </MenuItem>
          <MenuItem value={props.type === "movies" ? "movie_id" : "show_id"}>
            {props.type === "movies" ? "Movie Id" : "Show Id"}
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.sort}
          onChange={props.sortHandler}
          label="Sort"
          className={classes.select}
        >
          <MenuItem value="0">Ascending</MenuItem>
          <MenuItem value="1">Descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default selectOption;
