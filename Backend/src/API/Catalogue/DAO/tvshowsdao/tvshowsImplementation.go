package tvshowsdao

import (
	"encoding/json"
	"net/http"
	"utils"
)

//TvShowsImplementation Function for movie list request
func TvShowsImplementation(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	page, sort, search, attribute := utils.GetParameters(r)
	tvShowList := GetAllTvShows(page, sort, search, attribute, utils.PAGELIMIT)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tvShowList)
}
