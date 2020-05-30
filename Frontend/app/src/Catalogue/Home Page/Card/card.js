import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Aux from "../../../hoc/auxilory";
import { IMAGE_BASE_URL } from "../../../Common/Constants/URLConstants";
import Image from "react-bootstrap/Image";
import Style from "./cardStyle";
import { Link } from "react-router-dom";
import * as linkConstants from "../../../Common/Constants/linkConstants";
const useStyles = makeStyles(Style);

//MovieCard display the card of the movie description
const card = (props) => {
  const classes = useStyles();
  return (
    <Aux>
      <Link
        to={{
          pathname:
            (props.list.title
              ? linkConstants.MOVIE_LIST
              : linkConstants.TVSHOWS) + props.list.id,
          search: "?page=1",
        }}
        className={classes.link}
      >
        <Card className={classes.root}>
          <CardActionArea>
            <div className={classes.image}>
              <Image
                src={IMAGE_BASE_URL + props.list.poster_path}
                alt="poster"
                className={classes.media}
              />
            </div>
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                className={classes.title}
              >
                {props.list.title}
                {props.list.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Aux>
  );
};

export default card;
