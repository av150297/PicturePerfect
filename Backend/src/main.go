package main

import (
	"API/Catalogue/DAO/moviedao"
	"API/home"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	//Uncomment these two line to read movie list from TDMB API upto that particular page
	// pageNumber := 3
	// moviedao.ReadTMDB(pageNumber)

	mapURLs()
}

func mapURLs() {
	router := mux.NewRouter()
	router.HandleFunc("/", home.HomePage) //Dummy HomePage
	router.HandleFunc("/movies/catalogue", moviedao.MovieImplementation)
	log.Println("Running on port 3001")
	log.Panic(http.ListenAndServe(":3001", router))
}
