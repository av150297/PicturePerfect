const style = {
  root: {
    width: 180,
    marginBottom: 10,
    outline: "none",
  },
  media: {
    height: 250,
    width: "100%",
    outline: "none",
    zIndex: -1,
    opacity: 0.6,
    backgroundColor: "black",
    "&:hover": {
      opacity: 1,
    },
  },
  title: {
    textAlign: "center",
    outline: "none",
    maxHeight: 32,
    overflow: "hidden",
    transitionProperty: "max-height",
    transitionDuration: "0.6s",
    transitionTimingFunction: "ease-in-out",
    "&:hover": {
      maxHeight: 100,
    },
  },
  image: {
    backgroundColor: "#000000",
  },
  link: {
    "&:hover": {
      textDecoration: "none",
    },
  },
};

export default style;
