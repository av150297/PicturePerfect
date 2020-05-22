package tvshowsdao

import (
	"log"
	"utils"

	_ "github.com/go-sql-driver/mysql" //SQL Driver
	"github.com/jinzhu/gorm"
)

//GetAllTvShows function to retrive all the tv shows
func GetAllTvShows(page int, sort int, search string, attribute string, limit int) TvShowList {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	if dberr != nil {
		log.Fatal(dberr)
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
	tvShowList := TvShowList{}
	db.Debug().Order(sortString).Limit(limit).Offset((page-1)*utils.PAGELIMIT).Where("name like ?", search).Find(&tvShowList.List)
	tvShowList.LastPage = (count + utils.PAGELIMIT - 1) / utils.PAGELIMIT
	return tvShowList
}

//Save function to save the movie in the database
func (list *TvShowList) Save(index int) {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	defer db.Close()
	if dberr != nil {
		log.Fatal(dberr)
	}
	if index == 1 {
		db.Debug().DropTableIfExists(&TvShow{})
	}
	db.AutoMigrate(&TvShow{})
	for _, show := range list.List {
		db.Debug().Create(&show)
	}
}
