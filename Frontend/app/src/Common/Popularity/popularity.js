import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Fab from "@material-ui/core/Fab";
import Style from "./popularityStyle";
const useStyles = makeStyles(Style);

const popularity = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab aria-label="save">
          <h4 className={classes.percentage}>{props.value * 10 + 2}%</h4>
        </Fab>
        {
          <CircularProgress
            variant="static"
            value={props.value * 10 + 2}
            size={68}
            className={classes.fabProgress}
          />
        }
        <span className={classes.heading}>Popularity</span>
      </div>
    </div>
  );
};

export default popularity;
