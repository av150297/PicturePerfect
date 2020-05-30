import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "../../../hoc/axios";
import Style from "./postReviewStyle";
import Aux from "../../../hoc/auxilory";

const useStyles = makeStyles(Style);

const postReview = (props) => {
  const classes = useStyles();

  const [state, setState] = useState({
    type_id: parseInt(props.typeId, 10),
    type: props.type,
    author: "",
    content: "",
  });
  const validateUsername = (username) => {
    var letters = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    if (username.match(letters)) {
      return true;
    } else {
      alert("Invalid User Name");
      return false;
    }
  };
  const reviewSubmitHandler = (event) => {
    event.preventDefault();
    if (validateUsername(state.author)) {
      const headers = {
        "Content-Type": "text/plain",
      };
      axios
        .post("/post_review", state, {
          headers,
        })
        .then((response) => {
          setState({
            ...state,
            author: "",
            content: "",
          });
          props.setState(!props.state);
          props.setSnackBarState(1);
        })
        .catch((error) => {
          props.setSnackBarState(2);
        });
    }
  };
  const usernameChangeHandler = (event) => {
    setState({
      ...state,
      author: event.target.value,
    });
  };

  const reviewChangeHandler = (event) => {
    setState({
      ...state,
      content: event.target.value,
    });
  };

  return (
    <Aux>
      <form
        className={classes.root}
        onSubmit={reviewSubmitHandler}
        autoComplete="off"
        method="post"
      >
        <div>
          <TextField
            id="standard-basic"
            label="Your Name"
            color="primary"
            value={state.author}
            placeholder="Enter your name"
            variant="outlined"
            className={classes.username}
            inputProps={{
              maxLength: 30,
            }}
            onChange={usernameChangeHandler}
            required
          />
        </div>
        <div className={classes.textarea}>
          <TextField
            id="filled-basic"
            label="Review"
            variant="outlined"
            value={state.content}
            type="textarea"
            placeholder="Write your review here"
            multiline
            fullWidth
            rowsMax={35}
            onChange={reviewChangeHandler}
            required
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
          >
            Post
          </Button>
        </div>
      </form>
    </Aux>
  );
};

export default postReview;
