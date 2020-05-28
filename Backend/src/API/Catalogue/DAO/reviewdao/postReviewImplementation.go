package reviewdao

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"utils"

	"github.com/google/uuid"
)

//PostReviewImplementation function
func PostReviewImplementation(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	var review = Review{}
	data, err := ioutil.ReadAll(r.Body)
	if err == nil {
		err := json.Unmarshal(data, &review)
		if err == nil {
			review.ReviewID = uuid.New().String()
			review.Save()
		}
	}
}
