package main

import (
	"API/Catalogue/DAO/moviedao"
	"API/Catalogue/DAO/reviewdao"
	"API/Catalogue/DAO/tvshowsdao"
	"API/homepage"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	//Uncomment these two line to read movie list from TDMB API upto that particular page
	//pageNumber := 4
	//tmdbdao.PopulateData(pageNumber)
	mapURLs()
}

//mapURLS function maps the URLS to its corresponsind components
func mapURLs() {
	router := mux.NewRouter()
	router.HandleFunc("/", homepage.Implementation)
	router.HandleFunc("/movies/catalogue", moviedao.MovieImplementation)
	router.HandleFunc("/movies/catalogue/{movie_id}", moviedao.MovieInfoImplementation)
	router.HandleFunc("/movies/reviews/{type_id}", reviewdao.ReviewsImplementation)
	router.HandleFunc("/tvshows/catalogue", tvshowsdao.TvShowsImplementation)
	router.HandleFunc("/tvshows/catalogue/{show_id}", tvshowsdao.TvShowInfoImplementation)
	router.HandleFunc("/post_review", reviewdao.PostReviewImplementation).Methods("POST")
	log.Println("Running on port 3001")
	log.Panic(http.ListenAndServe(":3001", router))
}
