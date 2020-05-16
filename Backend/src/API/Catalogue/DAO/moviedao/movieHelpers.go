package moviedao

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/jinzhu/gorm"
)

//function to retrieve all movies on particular page
func getAllMovies(page int, sort int, search string, attribute string) MovieList {
	db, dberr := gorm.Open("mysql", DATABASEURL)
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
	db.Debug().Order(sortString).Limit(PAGELIMIT).Offset((page-1)*PAGELIMIT).Where("title like ?", search).Find(&movieList.List)
	movieList.LastPage = (count + PAGELIMIT - 1) / PAGELIMIT
	return movieList
}

func getParameters(r *http.Request) (int, int, string, string) {
	page := 1
	sort := 0
	search := ""
	attribute := "title"
	pageQuery, ok := r.URL.Query()["page"]
	fmt.Println("Page Query", pageQuery)
	if ok {
		pageNumber, strerr := strconv.Atoi(pageQuery[0])
		if strerr == nil {
			fmt.Println("Enter")
			page = pageNumber
		}
	}
	sortQuery, ok := r.URL.Query()["sort"]
	if ok {
		sortOrder, streerr := strconv.Atoi(sortQuery[0])
		if streerr == nil {
			sort = sortOrder
		}
	}
	searchQuery, ok := r.URL.Query()["search"]
	if ok {
		search = searchQuery[0]
	}
	attributeQuery, ok := r.URL.Query()["attribute"]
	if ok {
		attribute = attributeQuery[0]
	}
	return page, sort, search, attribute
}
