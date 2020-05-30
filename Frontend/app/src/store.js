import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import movieListReducer from "./Catalogue/Movie List/movieListReducer";
import homePageReducer from "./Catalogue/Home Page/homePageReducer";
import movieReducer from "./Catalogue/Movie Info/Movie/movieReducer";
import reviewReducer from "./Catalogue/Reviews/reviewsReducer";
import tvShowReducer from "./Catalogue/TvShow Info/TvShow/tvShowReducer";
//rootReducer to combine all the reducers from different components
const rootReducer = combineReducers({
  movieList: movieListReducer,
  homePage: homePageReducer,
  movie: movieReducer,
  reviews: reviewReducer,
  tvShow: tvShowReducer,
});

//Redux store to manage the state globally
const store = createStore(
  rootReducer,
  compose(applyMiddleware(createLogger(), thunk))
);

export default store;
