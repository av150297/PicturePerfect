import React from "react";
import Aux from "../../hoc/auxilory";
import Movie from "./Movie/movie";
import Reviews from "./Reviews/reviews";

const movieInfo = (props) => {
  return (
    <Aux>
      <Movie movieId={props.movieId} />
      <Reviews movieId={props.movieId} />
    </Aux>
  );
};

export default movieInfo;
