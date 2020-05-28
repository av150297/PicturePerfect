import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  root: {
    width: "95%",
    margin: "2.5%",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
    marginTop: 9,
  },
  content: {
    padding: 20,
    paddingLeft: 60,
    paddingRight: 40,
  },
});

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
