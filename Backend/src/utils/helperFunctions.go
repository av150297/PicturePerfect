package utils

import (
	"fmt"
	"net/http"
	"strconv"
)

//function to retrive all the parameter from the URL
func GetParameters(r *http.Request) (int, int, string, string) {
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
