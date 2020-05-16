import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "30%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    width: "100%",
  },
}));

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
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="release_date">Release Date</MenuItem>
          <MenuItem value="movie_id">Movie Id</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Order</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.sort}
          onChange={props.sortHandler}
          label="order"
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
