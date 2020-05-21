import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Aux from "../../../hoc/auxilory";
import { IMAGE_BASE_URL } from "../../../Common/Constants/URLConstants";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Style from "./movieCardStyle";
import * as LinkConstants from "../../../Common/Constants/linkConstants";

const useStyles = makeStyles(Style);

//MovieCard display the card of the movie description
const movieCard = (props) => {
  const classes = useStyles();
  return (
    <Aux>
      <Card className={classes.root}>
        <CardActionArea className={classes.cardcontent}>
          <div className={classes.image}>
            <Image
              src={IMAGE_BASE_URL + props.item.poster_path}
              alt="poster"
              className={classes.media}
            />
          </div>
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.title}
            >
              {props.type === "movies" ? props.item.title : props.item.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.description}
            >
              {props.item.overview}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" disabled>
            {props.type === "movies"
              ? props.item.release_date
              : props.item.first_air_date}
          </Button>
          <Link
            to={
              props.type === "movies"
                ? LinkConstants.MOVIE_LIST + "/" + props.item.id
                : LinkConstants.TV_SHOWS + "/" + props.item.id
            }
            className={classes.link}
          >
            <Button size="small" color="primary" className={classes.button}>
              Know More
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Aux>
  );
};

export default movieCard;
