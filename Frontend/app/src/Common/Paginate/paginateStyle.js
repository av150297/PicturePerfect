const style = (theme) => {
  return {
    root: {
      "& > *": {
        minWidth: 500,
        maxWidth: 500,
        width: "40%",
        marginTop: theme.spacing(2),
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginDown: "10px",
      },
      "&:hover,:focus": {
        outline: "none",
      },
    },
    link: {
      "&:hover": {
        textDecoration: "none",
      },
    },
  };
};
export default style;
