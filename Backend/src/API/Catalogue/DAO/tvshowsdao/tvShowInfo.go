package tvshowsdao

import (
	"encoding/json"
	"net/http"
	"strconv"
	"utils"

	"github.com/gorilla/mux"
)

//TvShowInfoImplementation function
func TvShowInfoImplementation(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	vars := mux.Vars(r)
	showID, err := strconv.Atoi(vars["show_id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
	}
	var tvShow TvShow
	err = tvShow.GetTvShow(showID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tvShow)
}
