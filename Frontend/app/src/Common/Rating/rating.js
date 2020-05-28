import React from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import Style from "./ratingStyle";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import grey from "@material-ui/core/colors/grey";
import Box from "@material-ui/core/Box";
import Aux from "../../hoc/auxilory";

const useStyles = makeStyles(Style);

const rating = (props) => {
  const classes = useStyles();
  return (
    <Aux>
      <div className={classes.root}>
        <Rating
          name="size-large"
          value={props.value}
          size="large"
          readOnly
          precision={0.01}
          emptyIcon={
            <StarBorderIcon fontSize="inherit" style={{ color: grey[500] }} />
          }
        />
        <Box ml={2}>{props.value.toFixed(1)}</Box>
      </div>
    </Aux>
  );
};

export default rating;
