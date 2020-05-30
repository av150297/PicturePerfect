package moviedao

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"utils"

	"github.com/jinzhu/gorm"
)

//GetMovies function to retrieve all movies on particular page
func (movieList *MovieList) GetMovies(page int, sort int, search string, attribute string) error {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	defer db.Close()
	if dberr != nil {
		return dberr
	}

	sortString := attribute
	if sort == 0 {
		sortString = sortString + " asc"
	} else {
		sortString = sortString + " desc"
	}
	search = "%" + search + "%"
	var count int
	db.Table("movies").Where("title like ?", search).Count(&count)
	db.Debug().Order(sortString).Limit(utils.PAGELIMIT).Offset((page-1)*utils.PAGELIMIT).Where("title like ?", search).Find(&movieList.List)
	movieList.LastPage = (count + utils.PAGELIMIT - 1) / utils.PAGELIMIT
	return nil
}

//Save function to save all the movies
func (movieList *MovieList) Save() error {
	for _, movie := range movieList.List {
		client := http.Client{}
		movieAPIUrl := fmt.Sprintf(utils.INFOAPIURL, "movie", movie.MovieID, utils.APIKEY)
		movieRequest, httperr := http.NewRequest(http.MethodGet, movieAPIUrl, nil)
		if httperr != nil {
			return httperr
		}
		movieResponse, geterr := client.Do(movieRequest)
		if geterr != nil {
			return geterr
		}
		movieBody, readerr := ioutil.ReadAll(movieResponse.Body)
		if readerr != nil {
			return readerr
		}
		updatedMovie := Movie{}
		jsonerr := json.Unmarshal(movieBody, &updatedMovie)
		if jsonerr != nil {
			return jsonerr
		}
		updatedMovie.Save()
		updatedMovie.SaveReview()
	}
	return nil
}
