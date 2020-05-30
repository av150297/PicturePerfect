import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import Style from "./reviewStyle";

const useStyles = makeStyles(Style);

const review = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Avatar>
            {props.data ? props.data.author[0].toUpperCase() : "A"}
          </Avatar>
          <Typography variant="h2" className={classes.heading}>
            {props.data.author}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.content}>
          <Typography>{props.data.content}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default review;
