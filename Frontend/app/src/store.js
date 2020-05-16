import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import movieListReducer from "./Catalogue/Movie List/movieListReducer";

const rootReducer = combineReducers({
  movieList: movieListReducer,
});

const store = createStore(
  rootReducer,
  compose(applyMiddleware(createLogger(), thunk))
);

export default store;
