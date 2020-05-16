package utils

import (
	"fmt"
	"net/http"
)

//EnableCors Function to enable Cors
func EnableCors(w *http.ResponseWriter) {
	fmt.Println("Utility Called")
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
