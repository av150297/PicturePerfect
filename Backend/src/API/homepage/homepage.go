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
	data.getData(utils.HOMEPAGELIMIT)
	json.NewEncoder(w).Encode(data)
}
