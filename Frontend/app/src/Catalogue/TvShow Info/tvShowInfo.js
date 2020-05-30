import React from "react";
import Aux from "../../hoc/auxilory";
import TvShow from "./TvShow/tvShow";

const tvShowInfo = (props) => {
  return (
    <Aux>
      <TvShow showId={props.showId} />
    </Aux>
  );
};

export default tvShowInfo;
