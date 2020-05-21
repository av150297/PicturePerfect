import React from "react";
import { Row, Col } from "react-bootstrap";
import Aux from "../../../hoc/auxilory";
import MovieCard from "./movieCard";

//MovieCarda display all the cards of the movie description
const movieCards = (props) => {
  let card = null;
  if (props.data.length) {
    const length = props.data.length;
    //Eight movies will be displayed per page
    for (let i = 0; i < 8; i++) {
      if (i < length) {
        card = (
          <Aux>
            {card}
            <Col>
              <MovieCard item={props.data[i]} type={props.type} />
            </Col>
          </Aux>
        );
      } else {
        card = (
          <Aux>
            {card}
            <Col></Col>
          </Aux>
        );
      }
    }
  }
  return <Row>{card}</Row>;
};

export default movieCards;
