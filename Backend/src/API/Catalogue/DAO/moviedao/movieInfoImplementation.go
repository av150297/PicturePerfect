package moviedao

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"utils"

	"github.com/gorilla/mux"
)

//MovieInfoImplementation function
func MovieInfoImplementation(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	vars := mux.Vars(r)
	movieID, err := strconv.Atoi(vars["movie_id"])
	if err != nil {
		//Some HTTP error
		log.Fatal("String Conversion error")
	}
	var movie Movie
	movie.GetMovie(movieID)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movie)
}
