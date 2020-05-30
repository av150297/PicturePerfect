package tvshowsdao

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"utils"

	"github.com/jinzhu/gorm"
)

//GetAllTvShows function to retrive all the tv shows
func (tvShowsList *TvShowList) GetAllTvShows(page int, sort int, search string, attribute string, limit int) error {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	if dberr != nil {
		return dberr
	}
	defer db.Close()
	if attribute == "title" {
		attribute = "name"
	} else if attribute == "release_date" {
		attribute = "first_air_date"
	}
	sortString := attribute
	if sort == 0 {
		sortString = sortString + " asc"
	} else {
		sortString = sortString + " desc"
	}
	search = "%" + search + "%"
	var count int
	db.Table("tv_shows").Where("name like ?", search).Count(&count)
	db.Debug().Order(sortString).Limit(limit).Offset((page-1)*utils.PAGELIMIT).Where("name like ?", search).Find(&tvShowsList.List)
	tvShowsList.LastPage = (count + utils.PAGELIMIT - 1) / utils.PAGELIMIT
	return nil
}

//Save function to save the movie in the database
func (tvShowsList *TvShowList) Save() error {
	for _, tvShows := range tvShowsList.List {
		client := http.Client{}
		APIUrl := fmt.Sprintf(utils.INFOAPIURL, "tv", tvShows.ShowID, utils.APIKEY)
		request, httperr := http.NewRequest(http.MethodGet, APIUrl, nil)
		if httperr != nil {
			return httperr
		}
		response, geterr := client.Do(request)
		if geterr != nil {
			return geterr
		}
		body, readerr := ioutil.ReadAll(response.Body)
		if readerr != nil {
			return readerr
		}
		updatedTvShows := TvShow{}
		jsonerr := json.Unmarshal(body, &updatedTvShows)
		if jsonerr != nil {
			return jsonerr
		}
		updatedTvShows.Save()
		updatedTvShows.SaveReview()
	}
	return nil
}
