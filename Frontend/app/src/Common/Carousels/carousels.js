import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Style from "./carouselsStyle";
import Aux from "../../hoc/auxilory";
const carousels = (props) => {
  return (
    <Aux>
      <Carousel style={Style.main}>
        <Carousel.Item style={Style.item}>
          <img
            style={Style.img}
            className="d-block w-100"
            src="https://moviekoop.com/Images/Cover_Photos/extraction-2020-hollywood-movie-poster.jpg"
            alt="Movie Poster"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={Style.item}>
          <img
            style={Style.img}
            className="d-block w-100"
            src="https://img.goldposter.com/2019/02/lucy_poster_goldposter_com_2.jpg"
            alt="Movie Poster"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={Style.item}>
          <img
            style={Style.img}
            className="d-block w-100"
            src="https://images.wallpapersden.com/image/download/1917-movie_67008_1366x768.jpg"
            alt="Movie Poster"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Aux>
  );
};

export default carousels;
