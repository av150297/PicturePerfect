const style = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    paddingLeft: 20,
    paddingTop: 10,
    minWidth: 200,
    position: "relative",
    "& > *": {},
  },
  row: {
    marginLeft: 10,
    marginRight: 5,
  },
  button: {
    position: "absolute",
    right: 10,
    textDecoration: "none",
    outline: "none",
    "&:hover": {
      textDecoration: "none",
      outline: "none",
    },
    "&:focus": {
      textDecoration: "none",
      outline: "none",
    },
  },
};

export default style;
