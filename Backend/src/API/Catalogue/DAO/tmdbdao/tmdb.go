package tmdbdao

import (
	"API/Catalogue/DAO/moviedao"
	"API/Catalogue/DAO/tvshowsdao"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"utils"

	_ "github.com/go-sql-driver/mysql" //SQL Driver
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

//ReadTMDB is a function to read movie list from TMDB
func ReadTMDB(pageNumber int) {
	for index := 1; index <= pageNumber; index++ {
		client := http.Client{}
		movieAPIUrl := fmt.Sprintf(utils.APIURL, "movie", utils.APIKEY, index)
		tvShowsAPIUrl := fmt.Sprintf(utils.APIURL, "tv", utils.APIKEY, index)
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
