package moviedao

import (
	"encoding/json"
	"net/http"
	"utils"
)

//MovieImplementation Function for movie list request
func MovieImplementation(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	page, sort, search, attribute := utils.GetParameters(r)
	var movieList MovieList
	movieList.GetMovies(page, sort, search, attribute)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movieList)
}
