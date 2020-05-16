package moviedao

import (
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

//saveImage function to save the poster
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
		movie.saveImage()
	}
}

//ReadTMDB is a function to read movie list from TMDB
func ReadTMDB(pageNumber int) {
	for index := 1; index <= pageNumber; index++ {
		client := http.Client{}
		apiurl := fmt.Sprintf(APIURL, APIKEY, index)
		fmt.Println(apiurl)
		request, httperr := http.NewRequest(http.MethodGet, apiurl, nil)
		if httperr != nil {
			log.Fatal(httperr)
		}
		response, geterr := client.Do(request)
		if geterr != nil {
			log.Fatal(geterr)
		}
		body, readerr := ioutil.ReadAll(response.Body)
		if readerr != nil {
			log.Fatal(readerr)
		}
		lst := MovieList{}
		jsonerr := json.Unmarshal(body, &lst)
		if jsonerr != nil {
			log.Fatal(jsonerr)
		}
		lst.save(index)
	}
}
