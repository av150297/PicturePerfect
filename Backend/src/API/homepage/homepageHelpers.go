package homepage

import (
	"log"
	utils "utils"

	_ "github.com/go-sql-driver/mysql" //SQL Driver
	"github.com/jinzhu/gorm"
)

func (data *Data) getData(limit int) {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	if dberr != nil {
		log.Fatal("Database error")
	}
	defer db.Close()
	db.Debug().Limit(limit).Find(&data.MovieList)
	db.Debug().Limit(limit).Find(&data.ShowList)
	return
}
