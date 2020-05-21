package homepage

import (
	"API/Catalogue/DAO/moviedao"
	"API/Catalogue/DAO/tvshowsdao"
)

//Data struct
type Data struct {
	MovieList []moviedao.Movie    `json:"movies"`
	ShowList  []tvshowsdao.TvShow `json:"shows"`
}
