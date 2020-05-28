package moviedao

//Movie struct
type Movie struct {
	MovieID     int     `gorm:"column:movie_id;primary_key" json:"id"`
	Title       string  `json:"title"`
	ReleaseDate string  `json:"release_date"`
	Language    string  `json:"original_language"`
	Adult       bool    `json:"adult"`
	Image       string  `json:"poster_path"`
	Overview    string  `gorm:"type:varchar(1000)" json:"overview"`
	VoteAverage float32 `json:"vote_average"`
	Backdrop    string  `json:"backdrop_path"`
	Tagline     string  `json:"tagline"`
	Runtime     int     `json:"runtime"`
}
