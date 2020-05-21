package homepage

import (
	"API/Catalogue/DAO/moviedao"
	"log"

	"github.com/jinzhu/gorm"
)

func (data *Data) getData(limit int) {
	db, dberr := gorm.Open("mysql", moviedao.DATABASEURL)
	if dberr != nil {
		log.Fatal("Database error")
	}
	defer db.Close()
	db.Debug().Limit(limit).Find(&data.MovieList)
	db.Debug().Limit(limit).Find(&data.ShowList)
	return
}
