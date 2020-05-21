package moviedao

import (
	"API/Catalogue/DAO/tvshowsdao"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql" //SQL Driver
	"github.com/jinzhu/gorm"
)

//saveImage function to save the poster image
func (movie Movie) saveImage() {
	filename := movie.Image
	response, httperr := http.Get(IMAGEBASEURL + filename)
	if httperr != nil {
		log.Fatal(httperr)
	}
	file, oserr := os.Create(OSIMAGEPATH + filename)
	defer file.Close()
	if oserr != nil {
		log.Fatal(oserr)
	}
	_, fileerr := io.Copy(file, response.Body)
	if fileerr != nil {
		log.Fatal(oserr)
	}
}

//ReadTMDB to save all the movies
func (list MovieList) save(index int) {
	db, dberr := gorm.Open("mysql", DATABASEURL)
	defer db.Close()
	if dberr != nil {
		log.Fatal(dberr)
	}
	if index == 1 {
		db.Debug().DropTableIfExists(&Movie{})
	}
	db.AutoMigrate(&Movie{})
	for _, movie := range list.List {
		db.Debug().Create(&movie)
		//movie.saveImage()
	}
}

//ReadTMDB is a function to read movie list from TMDB
func ReadTMDB(pageNumber int) {
	for index := 1; index <= pageNumber; index++ {
		client := http.Client{}
		movieAPIUrl := fmt.Sprintf(APIURL, "movie", APIKEY, index)
		tvShowsAPIUrl := fmt.Sprintf(APIURL, "tv", APIKEY, index)
		movieRequest, httperr := http.NewRequest(http.MethodGet, movieAPIUrl, nil)
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
		movieList := MovieList{}
		tvShowList := tvshowsdao.TvShowList{}
		jsonerr := json.Unmarshal(movieBody, &movieList)
		jsonerr = json.Unmarshal(tvShowBody, &tvShowList)
		if jsonerr != nil {
			log.Fatal(jsonerr)
		}
		movieList.save(index)
		tvShowList.Save(index)
	}
}
