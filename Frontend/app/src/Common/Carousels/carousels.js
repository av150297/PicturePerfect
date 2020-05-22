import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Style from "./carouselsStyle";
import Aux from "../../hoc/auxilory";
import * as CarouselsImage from "./carouselsImage";
const carousels = (props) => {
  return (
    <Aux>
      <Carousel style={Style.main}>
        <Carousel.Item style={Style.item}>
          <img
            style={Style.img}
            className="d-block w-100"
            src={CarouselsImage.IMAGE1}
            alt="Movie Poster"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={Style.item}>
          <img
            style={Style.img}
            className="d-block w-100"
            src={CarouselsImage.IMAGE2}
            alt="Movie Poster"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={Style.item}>
          <img
            style={Style.img}
            className="d-block w-100"
            src={CarouselsImage.IMAGE3}
            alt="Movie Poster"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={Style.item}>
          <img
            style={Style.img}
            className="d-block w-100"
            src={CarouselsImage.IMAGE4}
            alt="Movie Poster"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={Style.item}>
          <img
            style={Style.img}
            className="d-block w-100"
            src={CarouselsImage.IMAGE5}
            alt="Movie Poster"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Aux>
  );
};

export default carousels;
