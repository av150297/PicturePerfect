package tvshowsdao

import (
	"API/Catalogue/DAO/reviewdao"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"utils"

	_ "github.com/go-sql-driver/mysql" //SQL Driver
	"github.com/jinzhu/gorm"
)

//SaveReview function
func (tvShow *TvShow) SaveReview() error {
	reviewAPIURL := fmt.Sprintf(utils.REVIEWAPIURL, "tv", tvShow.ShowID, utils.APIKEY)
	client := http.Client{}
	reviewRequest, httperr := http.NewRequest(http.MethodGet, reviewAPIURL, nil)
	if httperr != nil {
		return httperr
	}
	reviewResponse, geterr := client.Do(reviewRequest)
	if geterr != nil {
		return geterr
	}
	reviewBody, readerr := ioutil.ReadAll(reviewResponse.Body)
	if readerr != nil {
		return readerr
	}
	reviewList := reviewdao.ReviewList{}
	jsonerr := json.Unmarshal(reviewBody, &reviewList)
	if jsonerr != nil {
		return jsonerr
	}
	err := reviewList.Save(tvShow.ShowID, "tvshow")
	return err
}

//Save function to update the movie list
func (tvShow *TvShow) Save() error {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	defer db.Close()
	if dberr != nil {
		return dberr
	}
	db.Debug().Create(tvShow)
	return nil
}

//GetTvShow function
func (tvShow *TvShow) GetTvShow(showID int) error {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	if dberr != nil {
		return dberr
	}
	defer db.Close()
	db.Debug().Where("show_id=?", showID).Find(&tvShow)
	return nil
}
