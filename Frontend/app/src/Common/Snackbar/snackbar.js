import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import Style from "./snackBarStyle";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(Style);

const snackBar = (props) => {
  const classes = useStyles();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.setSnackBarState(0);
  };
  var alert = null;
  if (props.snackBarState === 1) {
    alert = (
      <Alert onClose={handleClose} severity="success">
        Review Successfully Added
      </Alert>
    );
  } else if (props.snackBarState === 2) {
    alert = (
      <Alert onClose={handleClose} severity="error">
        Something Went Wrong !
      </Alert>
    );
  }
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={props.snackBarState ? true : false}
        autoHideDuration={6000}
        TransitionComponent={Grow}
        onClose={handleClose}
      >
        {alert}
      </Snackbar>
    </div>
  );
};

export default snackBar;
