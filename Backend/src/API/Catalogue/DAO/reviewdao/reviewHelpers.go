package reviewdao

import (
	"utils"

	"github.com/jinzhu/gorm"
)

//Save function to save the review in the database
func (reviewList *ReviewList) Save(typeID int, typ string) error {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	defer db.Close()
	if dberr != nil {
		return dberr
	}
	db.AutoMigrate(&Review{})
	for _, review := range reviewList.List {
		review.TypeID = typeID
		review.Type = typ
		db.Debug().Create(&review)
	}
	return nil
}

//GetReviews function
func (reviewList *ReviewList) GetReviews(typeID int, typ string) error {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	if dberr != nil {
		return dberr
	}
	defer db.Close()
	db.Debug().Where("type_id=? and type=?", typeID, typ).Find(&reviewList.List)
	return nil
}

//Save Function
func (review *Review) Save() error {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	if dberr != nil {
		return dberr
	}
	defer db.Close()
	db.Debug().Create(review)
	return nil
}
