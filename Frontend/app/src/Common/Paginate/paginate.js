import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { Link } from "react-router-dom";
import Style from "./paginateStyle";
import * as LinkConstants from "../Constants/linkConstants";
const useStyles = makeStyles(Style);
//Component for the pagination
const pagination = (props) => {
  const classes = useStyles();
  const paramHandler = (params) => {
    const p = new URLSearchParams(params);
    return "?" + p.toString();
  };
  return (
    <div>
      <div className={classes.root}>
        <Pagination
          count={props.pageCount}
          page={props.page}
          size="large"
          color="primary"
          onChange={props.pageChangeHandler}
          renderItem={(item) => {
            let paginationItem = null;
            if (item.page && item.page <= props.pageCount) {
              paginationItem = (
                <Link
                  to={{
                    pathname:
                      props.type === "movies"
                        ? LinkConstants.MOVIE_LIST
                        : LinkConstants.TV_SHOWS,
                    search:
                      props.search === ""
                        ? paramHandler({ page: item.page })
                        : paramHandler({
                            search: props.search,
                            page: item.page,
                          }),
                  }}
                  className={classes.link}
                >
                  <PaginationItem {...item} />
                </Link>
              );
            } else {
              paginationItem = <PaginationItem {...item} />;
            }
            return paginationItem;
          }}
        />
      </div>
    </div>
  );
};
export default pagination;
