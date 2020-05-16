package home

import (
	utils "utils"
	"fmt"
	"net/http"
)

func HomePage(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	fmt.Fprint(w, "Welcome to Homepage")
	fmt.Println("HomePage Loaded")
}
