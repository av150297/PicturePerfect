package moviedao

import (
	"encoding/json"
	"net/http"
	"utils"
)

//MovieImplementation Function
func MovieImplementation(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	page, sort, search, attribute := getParameters(r)
	movieList := getAllMovies(page, sort, search, attribute)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movieList)
}
