import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Row, Col } from "react-bootstrap";
import Aux from "../../../hoc/auxilory";
import { IMAGE_BASE_URL } from "../../../Common/Constants/URLConstants";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Style from "./movieCardStyle";
import * as LinkConstants from "../../../Common/Constants/linkConstants";

const useStyles = makeStyles(Style);

const movieCard = (props) => {
  const classes = useStyles();
  let card = null;
  if (props.movies.length) {
    const length = props.movies.length;
    for (let i = 0; i < 8; i++) {
      if (i < length) {
        card = (
          <Aux>
            {card}
            <Col>
              <Card className={classes.root}>
                <CardActionArea>
                  <div className={classes.image}>
                    <Image
                      src={IMAGE_BASE_URL + props.movies[i].poster_path}
                      alt="poster"
                      className={classes.media}
                    />
                  </div>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {props.movies[i].title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className={classes.description}
                    >
                      {props.movies[i].overview}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" disabled>
                    {props.movies[i].original_language}
                  </Button>
                  <Link
                    to={
                      LinkConstants.MOVIE_LIST + "/" + props.movies[i].movie_id
                    }
                    className={classes.link}
                  >
                    <Button
                      size="small"
                      color="primary"
                      className={classes.button}
                    >
                      Know More
                    </Button>
                  </Link>
                </CardActions>
              </Card>
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

export default movieCard;
