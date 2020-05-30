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
	var tvShowList TvShowList
	err := tvShowList.GetAllTvShows(page, sort, search, attribute, utils.PAGELIMIT)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tvShowList)
}
