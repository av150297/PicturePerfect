package reviewdao

import (
	"encoding/json"
	"net/http"
	"strconv"
	"utils"

	"github.com/gorilla/mux"
)

//ReviewsImplementation function
func ReviewsImplementation(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	vars := mux.Vars(r)
	typeID, err := strconv.Atoi(vars["type_id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	typeQuery, ok := r.URL.Query()["type"]
	var typ string
	if ok {
		typ = typeQuery[0]
	} else {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var reviewList ReviewList
	err = reviewList.GetReviews(typeID, typ)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reviewList)
}
