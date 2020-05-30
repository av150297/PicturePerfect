package moviedao

import (
	"encoding/json"
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
		w.WriteHeader(http.StatusBadRequest)
	}
	var movie Movie
	err = movie.GetMovie(movieID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movie)
}
