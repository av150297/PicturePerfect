package tvshowsdao

//TvShow struct
type TvShow struct {
	ShowID       int     `gorm:"column:show_id;primary_key" json:"id"`
	Name         string  `json:"name"`
	FirstAirDate string  `json:"first_air_date"`
	Language     string  `json:"original_language"`
	Adult        bool    `json:"adult"`
	Image        string  `json:"poster_path"`
	Overview     string  `gorm:"type:varchar(1000)" json:"overview"`
	VoteAverage  float32 `json:"vote_average"`
}
