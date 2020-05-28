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

//ReadMovieList is a function to read movie list from TMDB
func ReadMovieList(pageNumber int) {
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
		movieList.Save(index)
		tvShowList.Save(index)
	}
}

//UpdateMovieList function
func UpdateMovieList() {
	movieList := getAllMovies(false)
	for _, movie := range movieList.List {
		client := http.Client{}
		movieAPIUrl := fmt.Sprintf(utils.MOVIEAPIURL, "movie", movie.MovieID, utils.APIKEY)
		movieRequest, httperr := http.NewRequest(http.MethodGet, movieAPIUrl, nil)
		if httperr != nil {
			log.Fatal(httperr)
		}
		movieResponse, geterr := client.Do(movieRequest)
		if geterr != nil {
			log.Fatal(geterr)
		}
		movieBody, readerr := ioutil.ReadAll(movieResponse.Body)
		if readerr != nil {
			log.Fatal(readerr)
		}
		movie := moviedao.Movie{}
		jsonerr := json.Unmarshal(movieBody, &movie)
		if jsonerr != nil {
			log.Fatal(jsonerr)
		}
		movie.Save()
	}
}

func getAllMovies(flag bool) moviedao.MovieList {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	if dberr != nil {
		log.Fatal(dberr)
	}
	defer db.Close()
	if flag {
		db.Debug().DropTableIfExists(&reviewdao.Review{})
	}
	movieList := moviedao.MovieList{}
	db.Debug().Find(&movieList.List)
	return movieList
}

//ReadReviewList Function
func ReadReviewList() {
	movieList := getAllMovies(true)
	for _, movie := range movieList.List {
		reviewAPIURL := fmt.Sprintf(utils.REVIEWAPIURL, movie.MovieID, utils.APIKEY)
		client := http.Client{}
		reviewRequest, httperr := http.NewRequest(http.MethodGet, reviewAPIURL, nil)
		if httperr != nil {
			log.Fatal(httperr)
		}
		reviewResponse, geterr := client.Do(reviewRequest)
		if geterr != nil {
			log.Fatal(geterr)
		}
		reviewBody, readerr := ioutil.ReadAll(reviewResponse.Body)
		if readerr != nil {
			log.Fatal(readerr)
		}
		reviewList := reviewdao.ReviewList{}
		jsonerr := json.Unmarshal(reviewBody, &reviewList)
		if jsonerr != nil {
			log.Fatal(jsonerr)
		}
		reviewList.Save(movie.MovieID)
	}
}
