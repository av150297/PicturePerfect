import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: 5,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },

  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  percentage: {
    paddingTop: 5,
    fontWeight: "bold",
  },
  heading: {
    marginLeft: 10,
    paddingTop: 4,
    fontSize: "20px",
  },
}));

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
