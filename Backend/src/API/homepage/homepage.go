package homepage

import (
	"encoding/json"
	"net/http"
	utils "utils"
)

//Implementation function for testing
func Implementation(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	var data Data
	err := data.getData(utils.HOMEPAGELIMIT)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(data)
}
