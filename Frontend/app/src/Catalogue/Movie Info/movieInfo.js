import React from "react";
import Aux from "../../hoc/auxilory";
import Movie from "./Movie/movie";

const movieInfo = (props) => {
  return (
    <Aux>
      <Movie movieId={props.movieId} />
    </Aux>
  );
};

export default movieInfo;
