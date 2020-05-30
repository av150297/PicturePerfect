package reviewdao

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"utils"

	"github.com/google/uuid"
)

//PostReviewImplementation function
func PostReviewImplementation(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	fmt.Println("Entered")
	var review = Review{}
	data, err := ioutil.ReadAll(r.Body)
	if err == nil {
		err := json.Unmarshal(data, &review)
		if err == nil {
			review.ReviewID = uuid.New().String()
			review.Save()
		} else {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
	} else {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
