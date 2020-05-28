import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "../../../../hoc/axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),

      marginRight: 20,
    },
  },
  username: {
    width: 250,
    marginLeft: 22,
    marginTop: 10,
  },
  textarea: {
    marginLeft: 28,
    marginRight: 25,
    marginTop: 10,
  },
  button: {
    marginLeft: 22,
    paddingLeft: 10,
    paddingRight: 10,
  },
}));

const postReview = (props) => {
  const [state, setState] = useState({
    movie_id: parseInt(props.movieId, 10),
    author: "",
    content: "",
  });
  const classes = useStyles();
  const reviewSubmitHandler = (event) => {
    event.preventDefault();
    console.log(state);
    const headers = {
      "Content-Type": "text/plain",
    };
    axios
      .post("/post_review", state, { headers })
      .then((response) => {
        setState({
          movie_id: parseInt(props.movieId, 10),
          author: "",
          content: "",
        });
        props.setState(!state);
      })
      .catch((error) => {
        console.log("Errror Posting Review");
      });
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
  );
};

export default postReview;
