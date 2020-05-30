package homepage

import (
	utils "utils"

	_ "github.com/go-sql-driver/mysql" //SQL Driver
	"github.com/jinzhu/gorm"
)

func (data *Data) getData(limit int) error {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	if dberr != nil {
		return dberr
	}
	defer db.Close()
	db.Debug().Limit(limit).Find(&data.MovieList)
	db.Debug().Limit(limit).Find(&data.ShowList)
	return nil
}
