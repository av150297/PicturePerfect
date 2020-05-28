package reviewdao

import (
	"log"
	"utils"

	"github.com/jinzhu/gorm"
)

//Save function to save the review in the database
func (reviewList *ReviewList) Save(movieID int) {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	defer db.Close()
	if dberr != nil {
		log.Fatal(dberr)
	}
	db.AutoMigrate(&Review{})
	for _, review := range reviewList.List {
		review.MovieID = movieID
		db.Debug().Create(&review)
	}
}

//GetReviews function
func (reviewList *ReviewList) GetReviews(movieID int) {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	if dberr != nil {
		log.Fatal(dberr)
	}
	defer db.Close()
	db.Debug().Where("movie_id=?", movieID).Find(&reviewList.List)
}

//Save Function
func (review *Review) Save() {
	db, dberr := gorm.Open("mysql", utils.DATABASEURL)
	if dberr != nil {
		log.Fatal(dberr)
	}
	defer db.Close()
	db.Debug().Save(review)
}
