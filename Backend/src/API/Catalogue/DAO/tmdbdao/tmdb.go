package tmdbdao

import (
	"API/Catalogue/DAO/moviedao"
	"API/Catalogue/DAO/reviewdao"
	"API/Catalogue/DAO/tvshowsdao"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"utils"

	_ "github.com/go-sql-driver/mysql" //SQL Driver
	"github.com/jinzhu/gorm"
)

//PopulateData is a function to read movie list from TMDB
func PopulateData(pageNumber int) error {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	if dberr != nil {
		return dberr
	}
	db.Debug().DropTableIfExists(&moviedao.Movie{})
	db.Debug().DropTableIfExists(&tvshowsdao.TvShow{})
	db.Debug().DropTableIfExists(&reviewdao.Review{})
	db.AutoMigrate(&moviedao.Movie{})
	db.AutoMigrate(&reviewdao.Review{})
	db.AutoMigrate(&tvshowsdao.TvShow{})
	db.Close()
	for index := 1; index <= pageNumber; index++ {
		client := http.Client{}
		movieListAPIUrl := fmt.Sprintf(utils.APIURL, "movie", utils.APIKEY, index)
		tvShowsAPIUrl := fmt.Sprintf(utils.APIURL, "tv", utils.APIKEY, index)
		movieRequest, httperr := http.NewRequest(http.MethodGet, movieListAPIUrl, nil)
		tvShowRequest, httperr := http.NewRequest(http.MethodGet, tvShowsAPIUrl, nil)
		if httperr != nil {
			log.Fatal(httperr)
		}
		movieResponse, geterr := client.Do(movieRequest)
		tvShowResponse, geterr := client.Do(tvShowRequest)
		if geterr != nil {
			log.Fatal(geterr)
		}
		movieBody, readerr := ioutil.ReadAll(movieResponse.Body)
		tvShowBody, readerr := ioutil.ReadAll(tvShowResponse.Body)
		if readerr != nil {
			log.Fatal(readerr)
		}
		movieList := moviedao.MovieList{}
		tvShowList := tvshowsdao.TvShowList{}
		jsonerr := json.Unmarshal(movieBody, &movieList)
		jsonerr = json.Unmarshal(tvShowBody, &tvShowList)
		if jsonerr != nil {
			log.Fatal(jsonerr)
		}
		movieList.Save()
		tvShowList.Save()
	}
	return nil
}

//saveImage function to save the poster image
// func (movie moviedao.Movie) saveImage() {
// 	filename := movie.Image
// 	response, httperr := http.Get(utils.IMAGEBASEURL + filename)
// 	if httperr != nil {
// 		log.Fatal(httperr)
// 	}
// 	file, oserr := os.Create(utils.OSIMAGEPATH + filename)
// 	defer file.Close()
// 	if oserr != nil {
// 		log.Fatal(oserr)
// 	}
// 	_, fileerr := io.Copy(file, response.Body)
// 	if fileerr != nil {
// 		log.Fatal(oserr)
// 	}
// }
