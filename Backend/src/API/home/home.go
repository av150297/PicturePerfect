package home

import (
	"net/http"
	utils "utils"
)

//HomePage dummy function for testing
func HomePage(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
}
