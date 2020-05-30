import { green } from "@material-ui/core/colors";
const style = {
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: 12,
  },
  wrapper: {
    margin: 1,
    position: "relative",
  },

  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  percentage: {
    paddingTop: 5,
    fontWeight: "bold",
  },
  heading: {
    marginLeft: 10,
    paddingTop: 4,
    fontSize: "20px",
  },
};

export default style;
