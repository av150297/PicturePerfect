package main

import (
	"API/Catalogue/DAO/moviedao"
	"API/Catalogue/DAO/tvshowsdao"
	"API/homepage"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	//Uncomment these two line to read movie list from TDMB API upto that particular page
	// pageNumber := 4
	// moviedao.ReadTMDB(pageNumber)

	mapURLs()
}

//mapURLS function maps the URLS to its corresponsind components
func mapURLs() {
	router := mux.NewRouter()
	router.HandleFunc("/", homepage.Implementation)
	router.HandleFunc("/movies/catalogue", moviedao.MovieImplementation)
	router.HandleFunc("/tvshows/catalogue", tvshowsdao.TvShowsImplementation)
	log.Println("Running on port 3001")
	log.Panic(http.ListenAndServe(":3001", router))
}
