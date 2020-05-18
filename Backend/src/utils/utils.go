package utils

import (
	"net/http"
)

//EnableCors Function to enable Cors for cross origin API communication
func EnableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
