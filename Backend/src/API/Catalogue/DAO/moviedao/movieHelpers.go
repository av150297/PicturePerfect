package moviedao

import (
	"log"
	"utils"

	_ "github.com/go-sql-driver/mysql" //SQL Driver
	"github.com/jinzhu/gorm"
)

//GetMovies function to retrieve all movies on particular page
func (movieList *MovieList) GetMovies(page int, sort int, search string, attribute string) {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	if dberr != nil {
		log.Fatal(dberr)
	}
	defer db.Close()
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
}

//Save function to save all the movies
func (movieList *MovieList) Save(index int) {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	defer db.Close()
	if dberr != nil {
		log.Fatal(dberr)
	}
	if index == 1 {
		db.Debug().DropTableIfExists(&Movie{})
	}
	db.AutoMigrate(&Movie{})
	for _, movie := range movieList.List {
		db.Debug().Create(&movie)
	}
}

//Save function to update the movie list
func (movie *Movie) Save() {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	defer db.Close()
	if dberr != nil {
		log.Fatal(dberr)
	}
	db.Debug().AutoMigrate(&Movie{})
	db.Debug().Save(movie)
}

//GetMovie function
func (movie *Movie) GetMovie(movieID int) {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	if dberr != nil {
		log.Fatal(dberr)
	}
	defer db.Close()
	db.Debug().Where("movie_id=?", movieID).Find(&movie)
}
