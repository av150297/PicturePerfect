package moviedao

import (
	"log"
	"utils"

	_ "github.com/go-sql-driver/mysql" //SQL Driver
	"github.com/jinzhu/gorm"
)

//GetAllMovies function to retrieve all movies on particular page
func GetAllMovies(page int, sort int, search string, attribute string) MovieList {
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
	movieList := MovieList{}
	db.Debug().Order(sortString).Limit(utils.PAGELIMIT).Offset((page-1)*utils.PAGELIMIT).Where("title like ?", search).Find(&movieList.List)
	movieList.LastPage = (count + utils.PAGELIMIT - 1) / utils.PAGELIMIT
	return movieList
}

//Save function to save all the movies
func (list MovieList) Save(index int) {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
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
	}
}
